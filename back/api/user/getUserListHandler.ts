import {
  getUserFromAccessTokenOrThrowUnauthorized,
  usersTable,
  type SelectUser,
} from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { desc } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

type UserPicked = Pick<
  SelectUser,
  'email' | 'isActivated' | 'loggedAt' | 'registeredAt'
>

export type ResBody = {
  userList: UserPicked[]
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NO_PERMISSION'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getUserListHandler: RouterHandler = async (req, res, next) => {
  const messageList: string[] = []

  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  if (userFromAccessToken.roles.includes(userRole.superAdmin) === false) {
    messageList.push('User is not super admin')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NO_PERMISSION',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Super admin access verified')

  const usersListSelected = await db
    .select({
      email: usersTable.email,
      isActivated: usersTable.isActivated,
      loggedAt: usersTable.loggedAt,
      registeredAt: usersTable.registeredAt,
    })
    .from(usersTable)
    .orderBy(desc(usersTable.loggedAt))

  messageList.push(`Retrieved ${usersListSelected.length} users`)

  return httpResponse({
    statusCode: httpStatusCode.success200,
    body: {
      userList: usersListSelected,
      message: messageList.join(' | '),
    },
  })
}
