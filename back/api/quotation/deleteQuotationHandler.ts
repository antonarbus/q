import { QuotationModel } from '@back/entities/quotation'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { Quotation } from '@entities/quotation'
import type { NextFunction, Request, Response } from 'express'
import type { HydratedDocument } from 'mongoose'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  document?: HydratedDocument<Quotation>
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
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
  const { id: quotationId } = req.body

  const deleteFromDbResult = await QuotationModel.deleteOne({
    email,
    id: quotationId,
  })

  if (deleteFromDbResult.deletedCount === 0) {
    res.status(httpStatus.notFound_404).json({ message: 'not found' })

    return
  }

  const { path } = getFileInfo({ id: quotationId })
  const [{ statusCode }] = await bucket.file(path).delete()

  if (statusCode === 204) {
    res.status(httpStatus.success_200).json({ message: 'deleted' })

    return
  }

  res.status(httpStatus.notFound_404).json({ message: 'not deleted' })
}
