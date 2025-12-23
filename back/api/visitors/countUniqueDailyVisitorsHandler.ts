import { visitorsTable } from '@back/entities/visitor'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { runtimeConfig } from '@root/config/runtime'
import { sql } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  isNew: boolean
}

export type ResBody = {
  message: 'visitor counted'
}

export type ErrorResBody = {
  message: ErrorMessageCommon
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const countUniqueDailyVisitorsHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  // Do not distort statistics by e2e tests
  if (runtimeConfig.e2eTest === true) {
    return
  }

  await db
    .insert(visitorsTable)
    .values({
      visitedAt: new Date(),
      totalCount: 1,
      newCount: req.body.isNew === true ? 1 : 0,
    })
    .onConflictDoUpdate({
      target: visitorsTable.visitedAt,
      set: {
        totalCount: sql`${visitorsTable.totalCount} + 1`,
        newCount: sql`${visitorsTable.newCount} + ${req.body.isNew === true ? 1 : 0}`,
      },
    })

  res.status(httpStatus.success200).json({ message: 'visitor counted' })
}
