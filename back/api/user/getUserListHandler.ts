import {
  getUserFromAccessTokenOrThrowUnauthorized,
  usersTable,
  type SelectUser,
} from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import type { Pretty } from '@shared/lib/typescript/Pretty'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { desc } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = unknown

export type UserPicked = Pick<
  SelectUser,
  'email' | 'isActivated' | 'loggedAt' | 'registeredAt'
>

export type ResBody = Pretty<{
  userList: UserPicked[]
  message: 'users data'
}>

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'NO_PERMISSION'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getUserListHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  if (userFromAccessToken.roles.includes(userRole.superAdmin) === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NO_PERMISSION',
      statusCode: httpStatusCode.forbidden403,
      message: 'No permission to view users',
    })
  }

  const usersListSelected = await db
    .select({
      email: usersTable.email,
      isActivated: usersTable.isActivated,
      loggedAt: usersTable.loggedAt,
      registeredAt: usersTable.registeredAt,
    })
    .from(usersTable)
    .orderBy(desc(usersTable.loggedAt))

  res
    .status(httpStatusCode.success200)
    .json({ message: 'users data', userList: usersListSelected })
}
