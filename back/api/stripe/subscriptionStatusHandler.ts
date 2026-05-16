import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { usersTable } from '@back/entity/user/db/usersTableSchema'
import { quotationsTable } from '@back/entity/quotation/db/quotationsTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { FREE_QUOTATION_LIMIT } from '@back/shared/const/subscription'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { eq, count } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ResBody = {
  subscriptionExpiresAt: string | null
  quotationCount: number
  freeLimit: number
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, unknown, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const subscriptionStatusHandler: RouterHandler = async (req) => {
  const user = await getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const [[userSelected], [quotationsSelected]] = await Promise.all([
    db
      .select({ subscriptionExpiresAt: usersTable.subscriptionExpiresAt })
      .from(usersTable)
      .where(eq(usersTable.email, user.email)),
    db
      .select({ count: count() })
      .from(quotationsTable)
      .where(eq(quotationsTable.email, user.email)),
  ])

  messageList.push('Subscription status fetched')

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      subscriptionExpiresAt: userSelected?.subscriptionExpiresAt ?? null,
      quotationCount: quotationsSelected?.count ?? 0,
      freeLimit: FREE_QUOTATION_LIMIT,
      message: messageList.join(' | '),
    },
  })
}
