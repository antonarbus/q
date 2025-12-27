import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  quotationId: SelectQuotation['id']
}

export type ResBody = undefined

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'QUOTATION_NOT_FOUND' | 'QUOTATION_NOT_DELETED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteQuotationHandler: RouterHandler = async (req, res) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const deleteResponse = await db
    .delete(quotationsTable)
    .where(
      and(
        eq(quotationsTable.email, userFromAccessToken.email),
        eq(quotationsTable.id, req.body.quotationId),
      ),
    )

  if (deleteResponse.rowCount === 0) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'QUOTATION_NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: 'Quotation not found',
    })
  }

  const fileInfo = getFileInfo({ id: req.body.quotationId })
  const [{ statusCode }] = await bucket.file(fileInfo.path).delete()

  if (statusCode === 204) {
    res.status(httpStatusCode.noContent204).send()

    return
  }

  throw new HttpError<ErrorResBody['errorCode']>({
    errorCode: 'QUOTATION_NOT_DELETED',
    statusCode: httpStatusCode.notFound404,
    message: 'Quotation not deleted from storage',
  })
}
