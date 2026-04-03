import { usersTable } from '@back/entity/user/db/usersTableSchema'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { getUserFromRefreshTokenOrUnknownPerson } from '@back/entity/user/getUserFromRefreshTokenOrUnknownPerson'

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

export const testHandler: RouterHandler = async (req) => {
  const userFromRefreshToken = await getUserFromRefreshTokenOrUnknownPerson({
    req,
  })

  const messageList: string[] = []

  if (userFromRefreshToken.roles.includes('super-admin') === false) {
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

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      dbRes: userListSelected,
      message: messageList.join(' | '),
    },
  })
}
