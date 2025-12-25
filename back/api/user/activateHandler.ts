import { setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
} from '@back/shared/lib/json-webtoken'
import { usersTable, type SelectUser } from '@back/entities/user'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  activationKey: NonNullable<SelectUser['activationKey']>
}

export type ResBody = {
  accessJwtToken?: string
  accessJwtTokenExpiresOn?: string
  email?: SelectUser['email']
  roles?: SelectUser['roles']
  message: 'Already activated' | 'Activated'
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'KEY_NOT_FOUND' | 'FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const activateHandler: RouterHandler = async (req, res, _next) => {
  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.activationKey, req.body.activationKey))

  if (userSelected === undefined) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'KEY_NOT_FOUND',
      statusCode: httpStatusCode.badRequest400,
      message: 'Activation key not found',
    })
  }

  if (userSelected.isActivated === true) {
    res.status(httpStatusCode.success200).json({ message: 'Already activated' })

    return
  }

  const refreshToken = generateRefreshToken({
    email: userSelected.email,
    roles: userSelected.roles,
  })

  setRefreshTokenCookie({ res, refreshJwtToken: refreshToken.value })

  const [userUpdated] = await db
    .update(usersTable)
    .set({
      refreshJwtToken: refreshToken.value,
      isActivated: true,
      loggedAt: new Date().toISOString(),
    })
    .where(
      and(
        eq(usersTable.activationKey, req.body.activationKey),
        eq(usersTable.email, userSelected.email),
      ),
    )
    .returning()

  if (userUpdated === undefined) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FAILED',
      statusCode: httpStatusCode.serverError500,
      message: 'Failed to activate',
    })
  }

  const accessToken = generateAccessToken({
    email: userUpdated.email,
    roles: userUpdated.roles,
  })

  res.status(httpStatusCode.success200).json({
    message: 'Activated',
    accessJwtToken: accessToken.value,
    accessJwtTokenExpiresOn: accessToken.expiresOn,
    email: userUpdated.email,
    roles: userUpdated.roles,
  })
}
