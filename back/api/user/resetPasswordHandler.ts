import { usersTable, type SelectUser } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { setRefreshTokenCookie } from '@back/shared/headers'
import {
  generateAccessToken,
  generateRefreshToken,
} from '@back/shared/lib/json-webtoken'
import bcrypt from 'bcryptjs'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  email: string
  password: string
  resetPasswordKey: string
}

export type ResBody = {
  accessJwtToken?: string
  accessJwtTokenExpiresOn?: string
  email: SelectUser['email']
  roles: SelectUser['roles']
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'INCORRECT_RESET_KEY' | 'NOT_ACTIVATED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const resetPasswordHandler: RouterHandler = async (req, res) => {
  const messageList: string[] = []

  const emailFromInput = req.body.email.toLowerCase()
  const passwordFromInput = req.body.password
  const resetPasswordKeyFromInput = req.body.resetPasswordKey

  const [userSelected] = await db
    .select()
    .from(usersTable)
    .where(
      and(
        eq(usersTable.email, emailFromInput),
        eq(usersTable.resetPasswordKey, resetPasswordKeyFromInput),
      ),
    )

  if (userSelected === undefined) {
    messageList.push('User not found or incorrect reset key')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'INCORRECT_RESET_KEY',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Reset key validated')

  if (userSelected.isActivated === false) {
    messageList.push('Account not activated')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_ACTIVATED',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Account activation verified')

  const saltRounds = 10
  const passwordEncrypted = await bcrypt.hash(passwordFromInput, saltRounds)

  messageList.push('Password encrypted')

  const accessToken = generateAccessToken({
    email: emailFromInput,
    roles: userSelected.roles,
  })

  const refreshToken = generateRefreshToken({
    email: emailFromInput,
    roles: userSelected.roles,
  })

  messageList.push('Tokens generated')

  setRefreshTokenCookie({ res, refreshJwtToken: refreshToken.value })

  const [userUpdated] = await db
    .update(usersTable)
    .set({
      password: passwordEncrypted,
      refreshJwtToken: refreshToken.value,
      resetPasswordKey: '',
      loggedAt: new Date().toISOString(),
    })
    .where(
      and(
        eq(usersTable.email, emailFromInput),
        eq(usersTable.resetPasswordKey, resetPasswordKeyFromInput),
      ),
    )
    .returning()

  if (userUpdated === undefined) {
    messageList.push('Failed to update user in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'INTERNAL_ERROR',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Password reset successful')

  res.status(httpStatusCode.created201).json({
    accessJwtToken: accessToken.value,
    accessJwtTokenExpiresOn: accessToken.expiresOn,
    email: userUpdated.email,
    roles: userUpdated.roles,
    message: messageList.join(' | '),
  })
}
