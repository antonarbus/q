import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq, ne } from 'drizzle-orm'

export type ResBody = {
  distinctQuotationList: SelectQuotation['category'][]
  message: 'Found'
}

export type ErrorResBody = {
  message: ErrorMessageCommon
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationCategoriesHandler: RouterHandler = async (
  req,
  res,
  _next,
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
    .json({ message: 'Found', distinctQuotationList: distinctCategoryList })
}
