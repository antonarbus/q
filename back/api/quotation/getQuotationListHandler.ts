import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
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

  const selectedQuotationList = await db
    .select()
    .from(quotationsTable)
    .where(eq(quotationsTable.email, userFromAccessToken.email))

  if (selectedQuotationList.length === 0) {
    res
      .status(httpStatus.success200)
      .json({ message: 'No content', quotationList: [] })

    return
  }

  if (selectedQuotationList.length !== 0) {
    res
      .status(httpStatus.success200)
      .json({ message: 'Found', quotationList: selectedQuotationList })

    return
  }

  res
    .status(httpStatus.notFound404)
    .json({ message: 'Unhandled case', quotationList: [] })
}
