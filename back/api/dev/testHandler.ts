import { getUserFromRefreshTokenOrJohn, usersTable } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { userRole } from '@back/shared/const/userRole'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

type ResBody = unknown

type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'FORBIDDEN'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const testHandler: RouterHandler = async (req, res, next) => {
  const userFromRefreshToken = getUserFromRefreshTokenOrJohn({ req })

  const messageList: string[] = []

  if (userFromRefreshToken.roles.includes(userRole.superAdmin) === false) {
    messageList.push('Forbidden - super admin access required')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FORBIDDEN',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Super admin access verified')

  const userListSelected = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, 'some random guy'))

  messageList.push('Test query executed successfully')

  return httpResponse({
    statusCode: httpStatusCode.success200,
    body: {
      dbRes: userListSelected,
      message: messageList.join(' | '),
    },
  })
}
