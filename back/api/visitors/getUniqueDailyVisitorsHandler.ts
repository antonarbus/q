import { getUserFromAccessTokenOrNull } from '@back/entities/user'
import { type SelectVisitors, visitorsTable } from '@back/entities/visitor'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { userRole } from '@back/shared/const/userRole'
import { and, gte, lte } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type SearchQuery = {
  startDate: string
  endDate: string
}

export type ResBody = {
  visitorsCount: SelectVisitors[]
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
      .status(httpStatus.forbidden403)
      .json({ visitorsCount: [], message: 'forbidden' })

    return
  }

  const visitorsCount = await db
    .select()
    .from(visitorsTable)
    .where(
      and(
        gte(visitorsTable.visitedAt, new Date(req.query.startDate)),
        lte(visitorsTable.visitedAt, new Date(req.query.endDate)),
      ),
    )

  res.status(httpStatus.success200).json({ visitorsCount, message: 'ok' })
}
