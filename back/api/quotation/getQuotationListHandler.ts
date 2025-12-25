import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { Pretty } from '@shared/lib/typescript/Pretty'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import { type SelectQuotation, quotationsTable } from '@back/entities/quotation'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ResBody = Pretty<{
  quotationList: SelectQuotation[]
  message: 'Found' | 'No content'
}>

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'UNHANDLED_CASE'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, unknown, SearchQuery>,
  res: Response<ResBody>,
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

  throw new HttpError<ErrorResBody['errorCode']>({
    errorCode: 'UNHANDLED_CASE',
    statusCode: httpStatusCode.notFound404,
    message: 'Unhandled case in quotation list retrieval',
  })
}
