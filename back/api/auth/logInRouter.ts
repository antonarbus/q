import { Router, type Request, type Response, type NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import type { User } from '@entities/user'
import { httpStatus } from '@back/consts/httpStatus'
import { UserModel } from '@back/db/models/userModel'
import { sendEmail } from '@back/services/email'
import { config } from '@back/config'
import {
  createAccessToken,
  createRefreshToken,
  getJwtExpirationInDays,
  getUserFromRefreshToken,
  threeMonthsInSec,
  verifyRefreshToken,
} from '@back/utils/jwt'

export type ReqBody = {
  email: User['email']
  password: User['password']
}

export type ResBody = {
  name?: 'MongooseError'
  accessJwtToken?: string
  email?: User['email']
  roles?: User['roles']
  jwtRefreshTokenExpirationDays?: number
  message:
    | 'not registered'
    | 'no password'
    | 'bad password'
    | 'activation link sent'
    | 'activation link not sent'
    | 'good password'
    | 'super-admin logged as user'
    | 'failed to create token'
    | 'failed to update timestamp'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const logInRouter = Router()

const logIn: RouterHandler = async (req, res, next) => {
  try {
    const password = req.body.password
    const email = req.body.email.toLowerCase()

    const { roles } = getUserFromRefreshToken(req)
    const superAdmin = roles.includes('super-admin')

    const user = await UserModel.findOne({ email }).lean()

    if (!user) {
      res.status(httpStatus.badRequest_400).json({ message: 'not registered' })

      return
    }

    if (superAdmin) {
      const accessJwtToken = createAccessToken({ email, roles: user.roles })

      const isExistingRefreshJwtToken = Boolean(
        verifyRefreshToken(user.refreshJwtToken),
      )

      const refreshJwtToken = isExistingRefreshJwtToken
        ? user.refreshJwtToken
        : createRefreshToken({ email, roles: user.roles })

      res.cookie('refreshJwtToken', refreshJwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: threeMonthsInSec * 1000,
      })

      const userFromDb = await UserModel.findOneAndUpdate(
        { email },
        { refreshJwtToken, loggedAt: Date.now() },
        { new: true },
      )

      if (!userFromDb) {
        res
          .status(httpStatus.serverError_500)
          .json({ message: 'failed to update timestamp' })

        return
      }

      res.status(httpStatus.success_200).json({
        message: 'super-admin logged as user',
        accessJwtToken,
        email: user.email,
        roles: user.roles,
        jwtRefreshTokenExpirationDays: getJwtExpirationInDays({
          token: refreshJwtToken,
        }),
      })

      return
    }

    const passwordFromDB = user.password

    if (!user.password) {
      res.status(httpStatus.badRequest_400).json({ message: 'no password' })

      return
    }

    const isPasswordValid = await bcrypt.compare(password, passwordFromDB)

    if (!isPasswordValid) {
      res.status(httpStatus.forbidden_403).json({ message: 'bad password' })

      return
    }

    if (!user.isActivated) {
      const emailRes = await sendEmail({
        to: email,
        subject: 'Activate your account',
        html: `
          <p>Follow the link to activate the account.</p>
          <br>
          <p>
            <a
              clicktracking="off"
              href="${config.front.baseUrl}/activate/${user.activationKey}"
            >
              ${config.front.baseUrl}/activate/${user.activationKey}
            </a>
          </p>
        `,
      })

      if (emailRes?.[0].statusCode === 202) {
        res
          .status(httpStatus.forbidden_403)
          .json({ message: 'activation link sent' })

        return
      }

      res
        .status(httpStatus.serverError_500)
        .json({ message: 'activation link not sent' })

      return
    }

    const isExistingRefreshJwtToken = Boolean(
      verifyRefreshToken(user.refreshJwtToken),
    )

    const accessJwtToken = createAccessToken({ email, roles: user.roles })

    const refreshJwtToken = isExistingRefreshJwtToken
      ? user.refreshJwtToken
      : createRefreshToken({ email, roles: user.roles })

    res.cookie('refreshJwtToken', refreshJwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: threeMonthsInSec * 1000,
    })

    const userFromDb = await UserModel.findOneAndUpdate(
      { email },
      { refreshJwtToken, loggedAt: Date.now() },
      { new: true },
    )

    if (!userFromDb) {
      res
        .status(httpStatus.serverError_500)
        .json({ message: 'failed to update timestamp' })

      return
    }

    res.status(httpStatus.success_200).json({
      message: 'good password',
      accessJwtToken,
      email: user.email,
      roles: user.roles,
      jwtRefreshTokenExpirationDays: getJwtExpirationInDays({
        token: refreshJwtToken,
      }),
    })
  } catch (error) {
    next(error)
  }
}

logInRouter.post('/', logIn)
