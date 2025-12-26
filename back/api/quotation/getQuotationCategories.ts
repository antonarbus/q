import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpCode'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq, ne } from 'drizzle-orm'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  distinctQuotationList: SelectQuotation['category'][]
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationCategoriesHandler: RouterHandler = async (
  req,
  res,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

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

  res
    .status(httpStatusCode.success200)
    .json({ distinctQuotationList: distinctCategoryList })
}
