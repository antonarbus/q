import { getShouldTrace, removeRefreshTokenCookie } from '@back/shared/headers'
import { generateAccessToken } from '@back/shared/lib/json-webtoken'
import type { NextFunction, Request, Response } from 'express'
import {
  usersTable,
  type SelectUser,
} from '@back/entity/user/db/usersTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'
import { getUserFromRefreshTokenOrNull } from '@back/entity/user/getUserFromRefreshTokenOrNull'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  email: SelectUser['email']
  accessJwtToken: string
  accessJwtTokenExpiresOn: string
  roles: SelectUser['roles']
  jwtRefreshTokenExpirationDays: number
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NOT_LOGGED_IN'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getAccessTokenHandler: RouterHandler = async (req, res, next) => {
  const messageList: string[] = []

  // User perviously logged in
  const userFromRefreshToken = getUserFromRefreshTokenOrNull({ req })

  if (userFromRefreshToken === null) {
    messageList.push('No refresh token found')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_LOGGED_IN',
      statusCode: httpStatusCode.unauthorized401,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Refresh token validated')

  const shouldTrace = getShouldTrace({ req })

  if (shouldTrace === false) {
    messageList.push('Should not trace - skipping loggedAt update')

    // Just select without updating
    const [userSelected] = await db
      .select()
      .from(usersTable)
      .where(
        and(
          eq(usersTable.email, userFromRefreshToken.email),
          eq(usersTable.refreshJwtToken, userFromRefreshToken.refreshJwtToken),
        ),
      )

    if (userSelected === undefined) {
      messageList.push('User not found in database')

      removeRefreshTokenCookie({ res })

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'NOT_LOGGED_IN',
        statusCode: httpStatusCode.unauthorized401,
        message: messageList.join(' | '),
      })
    }

    messageList.push('User verified without trace')
  } else {
    messageList.push('Updating loggedAt timestamp')

    // Update loggedAt and return the updated user
    const [userUpdated] = await db
      .update(usersTable)
      .set({
        loggedAt: new Date().toISOString(),
      })
      .where(
        and(
          eq(usersTable.email, userFromRefreshToken.email),
          eq(usersTable.refreshJwtToken, userFromRefreshToken.refreshJwtToken),
        ),
      )
      .returning()

    if (userUpdated === undefined) {
      messageList.push('User not found in database')
      removeRefreshTokenCookie({ res })

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'NOT_LOGGED_IN',
        statusCode: httpStatusCode.unauthorized401,
        message: messageList.join(' | '),
      })
    }

    messageList.push('loggedAt updated')
  }

  const accessToken = generateAccessToken({
    email: userFromRefreshToken.email,
    roles: userFromRefreshToken.roles,
  })

  messageList.push('Access token generated')

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      accessJwtToken: accessToken.value,
      accessJwtTokenExpiresOn: accessToken.expiresOn,
      roles: userFromRefreshToken.roles,
      email: userFromRefreshToken.email,
      jwtRefreshTokenExpirationDays:
        userFromRefreshToken.jwtRefreshTokenExpirationDays,
      message: messageList.join(' | '),
    },
  })
}
