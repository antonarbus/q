import { getUserFromAccessTokenOrNull } from '@back/entities/user'
import { type SelectVisitors, visitorsTable } from '@back/entities/visitor'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { db } from '@back/shared/lib/drizzle/db'
import { userRole } from '@back/shared/const/userRole'
import { and, asc, gte, lte } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'

type UrlParam = ParamsDictionary

export type SearchQuery = {
  startDate: string
  endDate: string
}

type ReqBody = undefined

export type ResBody = {
  visitorList: SelectVisitors[]
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'FORBIDDEN'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getUniqueDailyVisitorsHandler: RouterHandler = async (
  req,
  res,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrNull({ req })
  const roles = userFromAccessToken?.roles ?? []

  if (roles.includes(userRole.superAdmin) === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FORBIDDEN',
      statusCode: httpStatusCode.forbidden403,
      message: 'Forbidden - super admin access required',
    })
  }

  const visitorListSelected = await db
    .select()
    .from(visitorsTable)
    .where(
      and(
        gte(visitorsTable.visitedAt, new Date(req.query.startDate)),
        lte(visitorsTable.visitedAt, new Date(req.query.endDate)),
      ),
    )
    .orderBy(asc(visitorsTable.visitedAt))

  res
    .status(httpStatusCode.success200)
    .json({ visitorList: visitorListSelected })
}
