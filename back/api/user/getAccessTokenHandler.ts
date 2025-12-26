import {
  getShouldNotTrace,
  removeRefreshTokenCookie,
} from '@back/shared/headers'
import { generateAccessToken } from '@back/shared/lib/json-webtoken'
import type { NextFunction, Request, Response } from 'express'
import {
  usersTable,
  getUserFromRefreshTokenOrNull,
  type SelectUser,
} from '@back/entities/user'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { httpStatusCode } from '@back/shared/const/httpCode'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  email: SelectUser['email']
  accessJwtToken: string
  accessJwtTokenExpiresOn: string
  roles: SelectUser['roles']
  jwtRefreshTokenExpirationDays: number
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NOT_LOGGED_IN'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getAccessTokenHandler: RouterHandler = async (req, res) => {
  // User perviously logged in
  const userFromRefreshToken = getUserFromRefreshTokenOrNull({ req })

  if (userFromRefreshToken === null) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_LOGGED_IN',
      statusCode: httpStatusCode.unauthorized401,
      message: 'Not logged in',
    })
  }

  const shouldNotTrace = getShouldNotTrace({ req })

  if (shouldNotTrace === true) {
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
      removeRefreshTokenCookie({ res })

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'NOT_LOGGED_IN',
        statusCode: httpStatusCode.unauthorized401,
        message: 'Not logged in',
      })
    }
  } else {
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
      removeRefreshTokenCookie({ res })

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'NOT_LOGGED_IN',
        statusCode: httpStatusCode.unauthorized401,
        message: 'Not logged in',
      })
    }
  }

  const accessToken = generateAccessToken({
    email: userFromRefreshToken.email,
    roles: userFromRefreshToken.roles,
  })

  res.status(httpStatusCode.success200).json({
    accessJwtToken: accessToken.value,
    accessJwtTokenExpiresOn: accessToken.expiresOn,
    roles: userFromRefreshToken.roles,
    email: userFromRefreshToken.email,
    jwtRefreshTokenExpirationDays:
      userFromRefreshToken.jwtRefreshTokenExpirationDays,
  })
}
