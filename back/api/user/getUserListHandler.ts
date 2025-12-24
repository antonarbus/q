import {
  getUserFromAccessTokenOrThrowUnauthorized,
  usersTable,
  type SelectUser,
} from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import type { Pretty } from '@shared/lib/typescript/Pretty'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { desc } from 'drizzle-orm'

export type UserPicked = Pick<
  SelectUser,
  'email' | 'isActivated' | 'loggedAt' | 'registeredAt'
>

export type ResBody = Pretty<{
  users: UserPicked[]
  message: 'users data'
}>

export type ErrorResBody = {
  users: UserPicked[]
  message:
    | ErrorMessageCommon
    | 'no permission to view'
    | 'No content'
    | 'Unhandled case'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getUserListHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  if (userFromAccessToken.roles.includes(userRole.superAdmin) === false) {
    res
      .status(httpStatus.forbidden403)
      .json({ message: 'no permission to view', users: [] })

    return
  }

  const users = await db
    .select({
      email: usersTable.email,
      isActivated: usersTable.isActivated,
      loggedAt: usersTable.loggedAt,
      registeredAt: usersTable.registeredAt,
    })
    .from(usersTable)
    .orderBy(desc(usersTable.loggedAt))

  if (users.length === 0) {
    res
      .status(httpStatus.notFound404)
      .json({ message: 'No content', users: [] })

    return
  }

  if (users.length !== 0) {
    res.status(httpStatus.success200).json({ message: 'users data', users })

    return
  }

  res
    .status(httpStatus.notFound404)
    .json({ message: 'Unhandled case', users: [] })
}
