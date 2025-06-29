import type { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import type { User } from '@entities/user'
import { httpStatus } from '@back/shared/const/httpStatus'
import { sendEmail } from '@back/shared/lib/sendgrid'
import { config } from '@back/config'
import {
  generateAccessToken,
  generateRefreshToken,
  getJwtExpirationInDays,
  verifyRefreshToken,
} from '@back/shared/lib/json-webtoken'
import { setNoTraceMode, setRefreshTokenCookie } from '@back/shared/headers'
import { userRole } from '@back/shared/const/userRole'
import { getUserFromAccessTokenOrNull, UserModel } from '@back/entities/user'

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

export const logInHandler: RouterHandler = async (req, res, next) => {
  const passwordFromInput = req.body.password
  const emailFromInput = req.body.email.toLowerCase()

  const userFromDb = await UserModel.findOne({ email: emailFromInput }).lean()

  if (userFromDb === null) {
    res.status(httpStatus.badRequest_400).json({ message: 'not registered' })

    return
  }

  const userFromAccessToken = getUserFromAccessTokenOrNull({ req })
  const rolesFromAccessToken = userFromAccessToken?.roles ?? []
  const emailFromAccessToken = userFromAccessToken?.email ?? 'john@gmail.com'

  const isSuperAdminOnBehalfOfUser =
    rolesFromAccessToken.includes(userRole.superAdmin) &&
    emailFromInput !== emailFromAccessToken

  if (isSuperAdminOnBehalfOfUser === true) {
    // just log in as a user without password coz you are a super-admin
    // do not leave traces of login + opening quotations & bookmarks

    const isExistingRefreshJwtToken = Boolean(
      verifyRefreshToken(userFromDb.refreshJwtToken),
    )

    const refreshJwtToken =
      isExistingRefreshJwtToken === true
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

  if (Boolean(passwordFromDb) === false) {
    res.status(httpStatus.badRequest_400).json({ message: 'no password' })

    return
  }

  const isPasswordValid = await bcrypt.compare(
    passwordFromInput,
    passwordFromDb,
  )

  if (isPasswordValid === false) {
    res.status(httpStatus.forbidden_403).json({ message: 'bad password' })

    return
  }

  if (userFromDb.isActivated === false) {
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

  const refreshJwtToken =
    isExistingRefreshJwtToken === true
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

  if (userUpdated === null) {
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
