import { visitorsTable } from '@back/entities/visitor'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { db } from '@back/shared/lib/drizzle/db'
import { sql } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { headerName } from '@back/shared/headers'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  isNew: boolean
}

export type ResBody = undefined

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const countUniqueDailyVisitorsHandler: RouterHandler = async (
  req,
  res,
) => {
  const isE2ETest = req.headers[headerName.e2eTest] === 'true'

  // Do not distort statistics by e2e tests
  if (isE2ETest === true) {
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

  res.status(httpStatusCode.success200)
}
