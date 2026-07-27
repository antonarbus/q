import { setRefreshTokenCookie } from '@back/shared/headers'
import { generateAccessToken, generateRefreshToken } from '@back/entity/user/lib/json-webtoken'
import { usersTable } from '@back/entity/user/db/usersTableSchema'
import type { SelectUser } from '@back/entity/user/db/usersTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  activationKey: NonNullable<SelectUser['activationKey']>
}

export type ResBody = {
  accessJwtToken: string
  accessJwtTokenExpiresOn: string
  email: SelectUser['email']
  roles: SelectUser['roles']
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'KEY_NOT_FOUND' | 'FAILED' | 'ALREADY_ACTIVATED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const activateHandler: RouterHandler = async (req, res) => {
  const messageList: string[] = []

  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.activationKey, req.body.activationKey))

  if (userSelected === undefined) {
    messageList.push('Activation key not found')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'KEY_NOT_FOUND',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Activation key valid')

  if (userSelected.isActivated === true) {
    messageList.push('Account already activated')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'ALREADY_ACTIVATED',
      statusCode: httpStatusCode.conflict409,
      message: messageList.join(' | '),
    })
  }

  const refreshToken = await generateRefreshToken({
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
    messageList.push('Failed to activate account in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FAILED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Account activated')

  const accessToken = await generateAccessToken({
    email: userUpdated.email,
    roles: userUpdated.roles,
  })

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      message: messageList.join(' | '),
      accessJwtToken: accessToken.value,
      accessJwtTokenExpiresOn: accessToken.expiresOn,
      email: userUpdated.email,
      roles: userUpdated.roles,
    },
  })
}
