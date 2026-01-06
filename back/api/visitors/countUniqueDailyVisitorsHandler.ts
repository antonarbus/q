import { visitorsTable } from '@back/entities/visitor/visitorsTableSchema'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { sql } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { headerName } from '@back/shared/headers'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  isNew: boolean
}

export type ResBody = {
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const countUniqueDailyVisitorsHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const messageList: string[] = []

  const isE2ETest = req.headers[headerName.e2eTest] === 'true'

  // Do not distort statistics by e2e tests
  if (isE2ETest === true) {
    messageList.push('E2E test - skipping visitor count')

    return httpJsonResponse({
      statusCode: httpStatusCode.success200,
      body: {
        message: messageList.join(' | '),
      },
    })
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

  if (req.body.isNew === true) {
    messageList.push('New visitor counted')
  } else {
    messageList.push('Returning visitor counted')
  }

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      message: messageList.join(' | '),
    },
  })
}
