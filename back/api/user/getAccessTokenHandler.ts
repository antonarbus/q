import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import {
  getShouldNotTrace,
  removeRefreshTokenCookie,
} from '@back/shared/headers'
import { generateAccessToken } from '@back/shared/lib/json-webtoken'
import type { User } from '@entities/user/type'
import type { NextFunction, Request, Response } from 'express'
import { usersTable, getUserFromRefreshTokenOrNull } from '@back/entities/user'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = unknown

export type ResBody = {
  message: 'issued access token'
  email?: User['email']
  accessJwtToken?: string
  accessJwtTokenExpiresOn?: string
  roles?: User['roles']
  jwtRefreshTokenExpirationDays: number
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'NOT_LOGGED_IN'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getAccessTokenHandler: RouterHandler = async (req, res, _next) => {
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
    message: 'issued access token',
    accessJwtToken: accessToken.value,
    accessJwtTokenExpiresOn: accessToken.expiresOn,
    roles: userFromRefreshToken.roles,
    email: userFromRefreshToken.email,
    jwtRefreshTokenExpirationDays:
      userFromRefreshToken.jwtRefreshTokenExpirationDays,
  })
}
