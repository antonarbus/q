import bcrypt from 'bcryptjs'
import express from 'express'
import { type User } from '@entities/user'
import { httpStatus } from '../../consts/httpStatus'
import { UserModel } from '../../db/models/userModel'
import { sendEmail } from '../../services/email'
import {
  createAccessToken,
  createRefreshToken,
  getJwtExpiration,
  thirtyDaysInSec,
  verifyRefreshToken,
} from '../../services/jwt'
import type { Next, ReqWithBody, ResWithBody } from '../../types'
import { domain } from '../../utils/env'

export type ReqBody = {
  email: User['email']
  password: User['password']
}

export type ResBody = {
  message:
    | 'no user data'
    | 'no password'
    | 'bad password'
    | 'activation link sent'
    | 'activation link not sent'
    | 'good password'
    | 'failed to create token'
  name?: 'MongooseError'
  accessJwtToken?: string
  email?: User['email']
  roles?: User['roles']
  jwtRefreshTokenExpiration?: Date
  jwtAccessTokenExpiration?: Date
}

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const logInRouter = express.Router()

const checkCredentials: RouterHandler = async (req, res, next) => {
  try {
    const password = req.body.password
    const email = req.body.email.toLowerCase()

    const user = await UserModel.findOne({ email }).lean()

    if (!user) {
      return res
        .status(httpStatus.badRequest_400)
        .json({ message: 'no user data' })
    }

    const passwordFromDB = user.password

    if (!user.password) {
      return res
        .status(httpStatus.badRequest_400)
        .json({ message: 'no password' })
    }

    const isPasswordValid = await bcrypt.compare(password, passwordFromDB)

    if (!isPasswordValid) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'bad password' })
    }

    if (!user.isActivated) {
      const emailRes = await sendEmail({
        to: email,
        subject: 'activate your account',
        html: `
        <p>Follow the link to activate the account.</p>
        <br>
        <p>
          <a
            clicktracking="off"
            href="${domain}/activate/${user.activationKey}"
          >
            ${domain}/activate/${user.activationKey}
          </a>
        </p>
      `,
      })

      if (emailRes?.[0].statusCode === 202) {
        return res
          .status(httpStatus.forbidden_403)
          .json({ message: 'activation link sent' })
      }

      return res
        .status(httpStatus.serverError_500)
        .json({ message: 'activation link not sent' })
    }

    const isExistingRefreshJwtToken = Boolean(
      verifyRefreshToken(user.refreshJwtToken),
    )

    const accessJwtToken = createAccessToken({ email, roles: user.roles })
    const refreshJwtToken = isExistingRefreshJwtToken
      ? user.refreshJwtToken
      : createRefreshToken({ email, roles: user.roles })

    if (!refreshJwtToken || !accessJwtToken) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'failed to create token' })
    }

    res.cookie('refreshJwtToken', refreshJwtToken, {
      maxAge: thirtyDaysInSec * 1000,
      httpOnly: true,
    })

    if (!isExistingRefreshJwtToken) {
      await UserModel.findOneAndUpdate(
        { email },
        { refreshJwtToken },
        { new: true },
      )
    }

    return res.status(httpStatus.success_200).json({
      message: 'good password',
      accessJwtToken,
      email: user.email,
      roles: user.roles,
      jwtRefreshTokenExpiration: getJwtExpiration({ token: refreshJwtToken }),
      jwtAccessTokenExpiration: getJwtExpiration({ token: accessJwtToken }),
    })
  } catch (error) {
    next(error)
  }
}

logInRouter.post('/', checkCredentials)
