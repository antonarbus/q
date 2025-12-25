import { getUserFromAccessTokenOrNull } from '@back/entities/user'
import { type SelectVisitors, visitorsTable } from '@back/entities/visitor'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { userRole } from '@back/shared/const/userRole'
import { and, gte, lte } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type SearchQuery = {
  startDate: string
  endDate: string
}

export type ResBody = {
  visitorList: SelectVisitors[]
  message: 'ok'
}

export type ErrorResBody = {
  visitorsCount: SelectVisitors[]
  message: ErrorMessageCommon | 'forbidden'
}

type RouterHandler = (
  req: Request<unknown, unknown, unknown, SearchQuery>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getUniqueDailyVisitorsHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrNull({ req })
  const roles = userFromAccessToken?.roles ?? []

  if (roles.includes(userRole.superAdmin) === false) {
    res
      .status(httpStatusCode.forbidden403)
      .json({ visitorsCount: [], message: 'forbidden' })

    return
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

  res
    .status(httpStatusCode.success200)
    .json({ visitorList: visitorListSelected, message: 'ok' })
}
