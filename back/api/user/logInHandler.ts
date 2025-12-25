import { getUserFromAccessTokenOrNull, usersTable } from '@back/entities/user'
import { userRole } from '@back/shared/const/userRole'
import { setNoTraceMode, setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
  getJwtExpirationInDays,
  verifyRefreshToken,
} from '@back/shared/lib/json-webtoken'
import { sendEmail } from '@back/shared/lib/mailersend'
import type { User } from '@entities/user/type'
import bcrypt from 'bcryptjs'
import { runtimeConfig } from '@root/config/runtime'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'

type SearchQuery = unknown
type UrlParam = unknown

export type ReqBody = {
  email: User['email']
  password: User['password']
}

export type ResBody = {
  accessJwtToken?: string
  accessJwtTokenExpiresOn?: string
  email?: User['email']
  roles?: User['roles']
  jwtRefreshTokenExpirationDays?: number
  message: 'good password' | 'super-admin on behalf of user'
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCodeCommon
    | 'NOT_REGISTERED'
    | 'NO_PASSWORD'
    | 'BAD_PASSWORD'
    | 'ACTIVATION_LINK_SENT_AGAIN'
    | 'ACTIVATION_LINK_NOT_SENT'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const logInHandler: RouterHandler = async (req, res, next) => {
  const passwordFromInput = req.body.password
  const emailFromInput = req.body.email.toLowerCase()

  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, emailFromInput))

  if (userSelected === undefined) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_REGISTERED',
      statusCode: httpStatusCode.badRequest400,
      message: 'User not registered',
    })
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

    const isExistingRefreshJwtTokenValid = Boolean(
      verifyRefreshToken(userSelected.refreshJwtToken),
    )

    const getRefreshToken = (): string => {
      if (isExistingRefreshJwtTokenValid === true) {
        return userSelected.refreshJwtToken
      }

      const refreshToken = generateRefreshToken({
        email: emailFromInput,
        roles: userSelected.roles,
      })

      return refreshToken.value
    }

    const refreshJwtToken = getRefreshToken()

    const jwtRefreshTokenExpirationDays = getJwtExpirationInDays({
      token: refreshJwtToken,
    })

    const accessToken = generateAccessToken({
      email: emailFromInput,
      roles: userSelected.roles,
    })

    setRefreshTokenCookie({ res, refreshJwtToken })
    setNoTraceMode({ res })

    res.status(httpStatusCode.success200).json({
      message: 'super-admin on behalf of user',
      accessJwtToken: accessToken.value,
      accessJwtTokenExpiresOn: accessToken.expiresOn,
      email: userSelected.email,
      roles: userSelected.roles,
      jwtRefreshTokenExpirationDays,
    })

    return
  }

  // normal login process
  const passwordFromDb = userSelected.password

  if (Boolean(passwordFromDb) === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NO_PASSWORD',
      statusCode: httpStatusCode.badRequest400,
      message: 'No password set for this account',
    })
  }

  const isPasswordValid = await bcrypt.compare(
    passwordFromInput,
    passwordFromDb,
  )

  if (isPasswordValid === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'BAD_PASSWORD',
      statusCode: httpStatusCode.forbidden403,
      message: 'Invalid credentials',
    })
  }

  if (userSelected.isActivated === false) {
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
              href="${runtimeConfig.front.baseUrl}/activate/${userSelected.activationKey}"
            >
              ${runtimeConfig.front.baseUrl}/activate/${userSelected.activationKey}
            </a>
          </p>
        `,
    })

    // https://developers.mailersend.com/general.html#api-response
    if (emailRes.statusCode === 202) {
      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'ACTIVATION_LINK_SENT_AGAIN',
        statusCode: httpStatusCode.forbidden403,
        message: 'Account not activated. Activation link sent to email',
      })
    }

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'ACTIVATION_LINK_NOT_SENT',
      statusCode: httpStatusCode.serverError500,
      message: 'Failed to send activation link',
    })
  }

  const isExistingRefreshJwtToken = Boolean(
    verifyRefreshToken(userSelected.refreshJwtToken),
  )

  const getRefreshToken = (): string => {
    if (isExistingRefreshJwtToken === true) {
      return userSelected.refreshJwtToken
    }

    const refreshToken = generateRefreshToken({
      email: emailFromInput,
      roles: userSelected.roles,
    })

    return refreshToken.value
  }

  const refreshJwtToken = getRefreshToken()

  const jwtRefreshTokenExpirationDays = getJwtExpirationInDays({
    token: refreshJwtToken,
  })

  setRefreshTokenCookie({ res, refreshJwtToken })

  const [userUpdated] = await db
    .update(usersTable)
    .set({
      refreshJwtToken,
      loggedAt: new Date().toISOString(),
    })
    .where(eq(usersTable.email, emailFromInput))
    .returning()

  if (userUpdated === undefined) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'INTERNAL_ERROR',
      statusCode: httpStatusCode.serverError500,
      message: 'Failed to update user',
    })
  }

  const accessToken = generateAccessToken({
    email: emailFromInput,
    roles: userSelected.roles,
  })

  res.status(httpStatusCode.success200).json({
    message: 'good password',
    accessJwtToken: accessToken.value,
    accessJwtTokenExpiresOn: accessToken.expiresOn,
    email: userUpdated.email,
    roles: userUpdated.roles,
    jwtRefreshTokenExpirationDays,
  })
}
