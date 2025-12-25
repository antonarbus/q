import { getUserFromRefreshTokenOrJohn, usersTable } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'FORBIDDEN'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, unknown, SearchQuery>,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const testHandler: RouterHandler = async (req, res, _next) => {
  const userFromRefreshToken = getUserFromRefreshTokenOrJohn({ req })

  if (userFromRefreshToken.roles.includes(userRole.superAdmin) === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FORBIDDEN',
      statusCode: httpStatusCode.forbidden403,
      message: 'Forbidden - super admin access required',
    })
  }

  const userListSelected = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, 'some random guy'))

  res.status(200).json({ dbRes: userListSelected })
}
