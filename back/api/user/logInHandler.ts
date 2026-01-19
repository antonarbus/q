import {
  usersTable,
  type SelectUser,
} from '@back/entity/user/db/usersTableSchema'
import { setNoTraceMode, setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
  getJwtExpirationInDays,
  verifyRefreshToken,
} from '@back/shared/lib/json-webtoken'
import { sendEmail } from '@back/shared/lib/mailersend'
import bcrypt from 'bcryptjs'
import { runtimeConfig } from '@root/config/runtime'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'
import { getUserFromAccessTokenOrNull } from '@back/entity/user/getUserFromAccessTokenOrNull'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  email: SelectUser['email']
  password: SelectUser['password']
}

export type ResBody = {
  accessJwtToken: string
  accessJwtTokenExpiresOn: string
  email: SelectUser['email']
  roles: SelectUser['roles']
  jwtRefreshTokenExpirationDays: number
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCode
    | 'NOT_REGISTERED'
    | 'NO_PASSWORD'
    | 'BAD_PASSWORD'
    | 'ACTIVATION_LINK_SENT_AGAIN'
    | 'ACTIVATION_LINK_NOT_SENT'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const logInHandler: RouterHandler = async (req, res, next) => {
  const passwordFromInput = req.body.password
  const emailFromInput = req.body.email.toLowerCase()

  const messageList: string[] = []

  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, emailFromInput))

  if (userSelected === undefined) {
    messageList.push('User not registered')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_REGISTERED',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push('User found in database')

  const userFromAccessToken = await getUserFromAccessTokenOrNull({ req })
  const rolesFromAccessToken = userFromAccessToken?.roles ?? []
  const emailFromAccessToken = userFromAccessToken?.email ?? 'unknown@gmail.com'

  const isSuperAdminOnBehalfOfUser =
    rolesFromAccessToken.includes('super-admin') &&
    emailFromInput !== emailFromAccessToken

  if (isSuperAdminOnBehalfOfUser === true) {
    messageList.push('Super-admin logging in on behalf of user')

    // just log in as a user without password coz you are a super-admin
    // do not leave traces of login + opening quotations & bookmarks

    const isExistingRefreshJwtTokenValid = Boolean(
      verifyRefreshToken(userSelected.refreshJwtToken),
    )

    const getRefreshToken = async (): Promise<string> => {
      if (isExistingRefreshJwtTokenValid === true) {
        return userSelected.refreshJwtToken
      }

      const refreshToken = await generateRefreshToken({
        email: emailFromInput,
        roles: userSelected.roles,
      })

      return refreshToken.value
    }

    const refreshJwtToken = await getRefreshToken()

    const jwtRefreshTokenExpirationDays = getJwtExpirationInDays({
      token: refreshJwtToken,
    })

    const accessToken = await generateAccessToken({
      email: emailFromInput,
      roles: userSelected.roles,
    })

    setRefreshTokenCookie({ res, refreshJwtToken })
    setNoTraceMode({ res })

    messageList.push('No-trace mode enabled')

    return httpJsonResponse({
      statusCode: httpStatusCode.success200,
      body: {
        message: messageList.join(' | '),
        accessJwtToken: accessToken.value,
        accessJwtTokenExpiresOn: accessToken.expiresOn,
        email: userSelected.email,
        roles: userSelected.roles,
        jwtRefreshTokenExpirationDays,
      },
    })
  }

  // normal login process
  messageList.push('Normal login process')

  const passwordFromDb = userSelected.password

  if (Boolean(passwordFromDb) === false) {
    messageList.push('No password set for account')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NO_PASSWORD',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  const isPasswordValid = await bcrypt.compare(
    passwordFromInput,
    passwordFromDb,
  )

  if (isPasswordValid === false) {
    messageList.push('Invalid password')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'BAD_PASSWORD',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Password verified')

  if (userSelected.isActivated === false) {
    messageList.push('Account not activated')

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
      messageList.push('Activation link sent to email')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'ACTIVATION_LINK_SENT_AGAIN',
        statusCode: httpStatusCode.forbidden403,
        message: messageList.join(' | '),
      })
    }

    messageList.push('Failed to send activation link')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'ACTIVATION_LINK_NOT_SENT',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  const isExistingRefreshJwtToken = Boolean(
    verifyRefreshToken(userSelected.refreshJwtToken),
  )

  const getRefreshToken = async (): Promise<string> => {
    if (isExistingRefreshJwtToken === true) {
      return userSelected.refreshJwtToken
    }

    const refreshToken = await generateRefreshToken({
      email: emailFromInput,
      roles: userSelected.roles,
    })

    return refreshToken.value
  }

  const refreshJwtToken = await getRefreshToken()

  const jwtRefreshTokenExpirationDays = getJwtExpirationInDays({
    token: refreshJwtToken,
  })

  setRefreshTokenCookie({ res, refreshJwtToken })

  messageList.push('Account activated')

  const [userUpdated] = await db
    .update(usersTable)
    .set({
      refreshJwtToken,
      loggedAt: new Date().toISOString(),
    })
    .where(eq(usersTable.email, emailFromInput))
    .returning()

  if (userUpdated === undefined) {
    messageList.push('Failed to update user in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'INTERNAL_ERROR',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  messageList.push('User logged in successfully')

  const accessToken = await generateAccessToken({
    email: emailFromInput,
    roles: userSelected.roles,
  })

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      message: messageList.join(' | '),
      accessJwtToken: accessToken.value,
      accessJwtTokenExpiresOn: accessToken.expiresOn,
      email: userUpdated.email,
      roles: userUpdated.roles,
      jwtRefreshTokenExpirationDays,
    },
  })
}
