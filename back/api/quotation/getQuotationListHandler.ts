import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import type { Pretty } from '@shared/lib/typescript/Pretty'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import { type SelectQuotation, quotationsTable } from '@back/entities/quotation'

export type ResBody = Pretty<{
  quotationList: SelectQuotation[]
  message: 'Found' | 'No content'
}>

export type ErrorResBody = {
  quotationList: SelectQuotation[]
  message: ErrorMessageCommon | 'Unhandled case'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationListHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const quotationListSelected = await db
    .select()
    .from(quotationsTable)
    .where(eq(quotationsTable.email, userFromAccessToken.email))

  if (quotationListSelected.length === 0) {
    res
      .status(httpStatusCode.success200)
      .json({ message: 'No content', quotationList: [] })

    return
  }

  if (quotationListSelected.length !== 0) {
    res
      .status(httpStatusCode.success200)
      .json({ message: 'Found', quotationList: quotationListSelected })

    return
  }

  res
    .status(httpStatusCode.notFound404)
    .json({ message: 'Unhandled case', quotationList: [] })
}
