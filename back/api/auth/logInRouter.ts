import { Router, type Request, type Response, type NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import type { User } from '@entities/user'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { sendEmail } from '@back/shared/services/email'
import { config } from '@back/config'
import {
  generateAccessToken,
  generateRefreshToken,
  getJwtExpirationInDays,
  verifyRefreshToken,
} from '@back/shared/lib/jwt'
import { setNoTraceMode, setRefreshTokenCookie } from '@back/shared/headers'
import { userRole } from '@back/shared/consts/userRole'
import { getUserFromRefreshToken, UserModel } from '@back/entities/user'
import { asyncHandler } from '@back/shared/utils/asyncHandler'

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
    | 'activation link sent again'
    | 'activation link not sent'
    | 'good password'
    | 'super-admin on behalf of user'
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
  const passwordFromInput = req.body.password
  const emailFromInput = req.body.email.toLowerCase()

  const userFromDb = await UserModel.findOne({ email: emailFromInput }).lean()

  if (!userFromDb) {
    res.status(httpStatus.badRequest_400).json({ message: 'not registered' })

    return
  }

  const { roles, email: emailFromRefreshToken } = getUserFromRefreshToken({
    req,
  })

  const isSuperAdminOnBehalfOfUser =
    roles.includes(userRole.superAdmin) &&
    emailFromInput !== emailFromRefreshToken

  if (isSuperAdminOnBehalfOfUser) {
    // just log in as a user without password coz you are a super-admin
    // do not leave traces of login + opening quotations & bookmarks

    const isExistingRefreshJwtToken = Boolean(
      verifyRefreshToken(userFromDb.refreshJwtToken),
    )

    const refreshJwtToken = isExistingRefreshJwtToken
      ? userFromDb.refreshJwtToken
      : generateRefreshToken({
          email: emailFromInput,
          roles: userFromDb.roles,
        })

    setRefreshTokenCookie({ res, refreshJwtToken })
    setNoTraceMode({ res })

    res.status(httpStatus.success_200).json({
      message: 'super-admin on behalf of user',
      accessJwtToken: generateAccessToken({
        email: emailFromInput,
        roles: userFromDb.roles,
      }),
      email: userFromDb.email,
      roles: userFromDb.roles,
      jwtRefreshTokenExpirationDays: getJwtExpirationInDays({
        token: refreshJwtToken,
      }),
    })

    return
  }

  // normal login process
  const passwordFromDb = userFromDb.password

  if (!passwordFromDb) {
    res.status(httpStatus.badRequest_400).json({ message: 'no password' })

    return
  }

  const isPasswordValid = await bcrypt.compare(
    passwordFromInput,
    passwordFromDb,
  )

  if (!isPasswordValid) {
    res.status(httpStatus.forbidden_403).json({ message: 'bad password' })

    return
  }

  if (!userFromDb.isActivated) {
    const emailRes = await sendEmail({
      to: emailFromInput,
      subject: 'Activate your account again',
      html: `
          <p>Looks like you did not activate your account during registration.</p>
          <p>Follow the link to activate the account.</p>
          <br>
          <p>
            <a
              clicktracking="off"
              href="${config.front.baseUrl}/activate/${userFromDb.activationKey}"
            >
              ${config.front.baseUrl}/activate/${userFromDb.activationKey}
            </a>
          </p>
        `,
    })

    if (emailRes?.[0].statusCode === 202) {
      res
        .status(httpStatus.forbidden_403)
        .json({ message: 'activation link sent again' })

      return
    }

    res
      .status(httpStatus.serverError_500)
      .json({ message: 'activation link not sent' })

    return
  }

  const isExistingRefreshJwtToken = Boolean(
    verifyRefreshToken(userFromDb.refreshJwtToken),
  )

  const refreshJwtToken = isExistingRefreshJwtToken
    ? userFromDb.refreshJwtToken
    : generateRefreshToken({ email: emailFromInput, roles: userFromDb.roles })

  setRefreshTokenCookie({ res, refreshJwtToken })

  const userUpdated = await UserModel.findOneAndUpdate(
    { email: emailFromInput },
    {
      refreshJwtToken,
      loggedAt: Date.now(),
    },
    { new: true },
  )

  if (!userUpdated) {
    res
      .status(httpStatus.serverError_500)
      .json({ message: 'failed to update timestamp' })

    return
  }

  const accessJwtToken = generateAccessToken({
    email: emailFromInput,
    roles: userFromDb.roles,
  })

  res.status(httpStatus.success_200).json({
    message: 'good password',
    accessJwtToken,
    email: userUpdated.email,
    roles: userUpdated.roles,
    jwtRefreshTokenExpirationDays: getJwtExpirationInDays({
      token: refreshJwtToken,
    }),
  })
}

logInRouter.post('/', asyncHandler(logIn))
