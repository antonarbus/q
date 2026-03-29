import { getUserFromAccessTokenOrNull } from '@back/entity/user/getUserFromAccessTokenOrNull'
import { type SelectVisitors, visitorsTable } from '@back/entity/visitor/db/visitorsTableSchema'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { and, asc, gte, lte } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import { type HttpResponse, httpJsonResponse } from '@back/shared/lib/express/httpResponse'

type UrlParam = ParamsDictionary

export type SearchQuery = {
  startDate: string
  endDate: string
}

type ReqBody = undefined

export type ResBody = {
  visitorList: SelectVisitors[]
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'FORBIDDEN'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getUniqueDailyVisitorsHandler: RouterHandler = async (req) => {
  const messageList: string[] = []

  const userFromAccessToken = await getUserFromAccessTokenOrNull({ req })
  const roles = userFromAccessToken?.roles ?? []

  if (roles.includes('super-admin') === false) {
    messageList.push('User is not super admin')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FORBIDDEN',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Super admin access verified')

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

  messageList.push(
    `Retrieved ${visitorListSelected.length} visitor records from ${req.query.startDate} to ${req.query.endDate}`,
  )

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      visitorList: visitorListSelected,
      message: messageList.join(' | '),
    },
  })
}
