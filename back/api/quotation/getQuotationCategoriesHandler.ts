import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq, ne } from 'drizzle-orm'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  distinctQuotationList: SelectQuotation['category'][]
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

export const getQuotationCategoriesHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const quotationListSelected = await db
    .selectDistinct({ category: quotationsTable.category })
    .from(quotationsTable)
    .where(
      and(
        eq(quotationsTable.email, userFromAccessToken.email),
        ne(quotationsTable.category, ''),
      ),
    )
    .orderBy(quotationsTable.category)

  const distinctCategoryList = quotationListSelected.map((row) => row.category)

  messageList.push(`Found ${distinctCategoryList.length} distinct categories`)

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      distinctQuotationList: distinctCategoryList,
      message: messageList.join(' | '),
    },
  })
}
