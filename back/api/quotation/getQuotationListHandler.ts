import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpCode'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import { type SelectQuotation, quotationsTable } from '@back/entities/quotation'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  quotationList: SelectQuotation[]
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
) => Promise<void>

export const getQuotationListHandler: RouterHandler = async (req, res) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const quotationListSelected = await db
    .select()
    .from(quotationsTable)
    .where(eq(quotationsTable.email, userFromAccessToken.email))

  messageList.push(`Found ${quotationListSelected.length} quotations`)

  res.status(httpStatusCode.success200).json({
    quotationList: quotationListSelected,
    message: messageList.join(' | '),
  })
}
