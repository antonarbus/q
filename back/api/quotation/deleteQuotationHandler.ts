import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'

export type ReqBody = {
  quotationId: SelectQuotation['id']
}

export type ResBody = {
  document?: SelectQuotation
  message: 'deleted'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'not found' | 'internal error' | 'not deleted'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteQuotationHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
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
    res.status(httpStatusCode.notFound404).json({ message: 'not found' })

    return
  }

  const fileInfo = getFileInfo({ id: req.body.quotationId })
  const [{ statusCode }] = await bucket.file(fileInfo.path).delete()

  if (statusCode === 204) {
    res.status(httpStatusCode.success200).json({ message: 'deleted' })

    return
  }

  res.status(httpStatusCode.notFound404).json({ message: 'not deleted' })
}
