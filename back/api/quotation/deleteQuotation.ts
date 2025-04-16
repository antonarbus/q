import type { Request, Response, NextFunction } from 'express'
import type { HydratedDocument } from 'mongoose'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFilePath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  document?: HydratedDocument<Quotation>
  message:
    | ErrorMessageCommon
    | 'did not find'
    | 'deleted'
    | 'internal error'
    | 'not deleted'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteQuotation: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { id: quotationId } = req.body

  const deleteFromDbResult = await QuotationModel.deleteOne({
    email,
    id: quotationId,
  })

  if (deleteFromDbResult.deletedCount === 0) {
    res.status(httpStatus.notFound_404).json({ message: 'did not find' })

    return
  }

  const filePath = getFilePath({ email, fileType: 'quotation', quotationId })
  const [{ statusCode }] = await bucket.file(filePath).delete()

  if (statusCode === 204) {
    res.status(httpStatus.success_200).json({ message: 'deleted' })

    return
  }

  res.status(httpStatus.notFound_404).json({ message: 'not deleted' })
}
