import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { getBucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable } from '@back/entity/quotation/db/quotationsTableSchema'
import type { SelectQuotation } from '@back/entity/quotation/db/quotationsTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import type { ParsedQs } from 'qs'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs

export type UrlParam = {
  id: SelectQuotation['id']
}

type ReqBody = undefined

export type ResBody = {
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'QUOTATION_NOT_FOUND'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const deleteQuotationHandler: RouterHandler = async (req) => {
  const userFromAccessToken = await getUserFromAccessTokenOrThrowUnauthorized({
    req,
  })

  const messageList: string[] = []

  const deleteResponse = await db
    .delete(quotationsTable)
    .where(
      and(
        eq(quotationsTable.email, userFromAccessToken.email),
        eq(quotationsTable.id, req.params.id),
      ),
    )

  if (deleteResponse.rowCount === 0) {
    messageList.push('Quotation not found in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'QUOTATION_NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Quotation deleted from database')

  const bucket = await getBucket()
  const fileInfo = getFileInfo({ id: req.params.id })

  await bucket
    .file(fileInfo.path)
    .delete()
    .catch(() => {
      messageList.push('Failed to delete quotation from storage')
    })

  messageList.push('Quotation deleted from storage')

  return httpJsonResponse({
    statusCode: httpStatusCode.noContent204,
    body: {
      message: messageList.join(' | '),
    },
  })
}
