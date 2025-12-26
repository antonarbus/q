import {
  getUserFromAccessTokenOrThrowUnauthorized,
  usersTable,
  type SelectUser,
} from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { userRole } from '@back/shared/const/userRole'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { desc } from 'drizzle-orm'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

type UserPicked = Pick<
  SelectUser,
  'email' | 'isActivated' | 'loggedAt' | 'registeredAt'
>

export type ResBody = {
  userList: UserPicked[]
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NO_PERMISSION'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getUserListHandler: RouterHandler = async (req, res) => {
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

  res.status(httpStatusCode.success200).json({ userList: usersListSelected })
}
