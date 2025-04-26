import type { Request, Response, NextFunction } from 'express'
import type { HydratedDocument } from 'mongoose'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import {
  bucket,
  getFilePath,
  getFolderPath,
} from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  document?: HydratedDocument<Quotation>
  filesDeletedQty: number
  message:
    | ErrorMessageCommon
    | 'not found'
    | 'deleted'
    | 'internal error'
    | 'not deleted'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteQuotationHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { id: quotationId } = req.body

  const deleteFromDbResult = await QuotationModel.deleteOne({
    email,
    id: quotationId,
  })

  if (deleteFromDbResult.deletedCount === 0) {
    res
      .status(httpStatus.notFound_404)
      .json({ message: 'not found', filesDeletedQty: 0 })

    return
  }

  const quotationFilePath = getFilePath({
    fileType: 'quotation',
    quotationId,
  })

  const [{ statusCode }] = await bucket.file(quotationFilePath).delete()
  const filesFolderPath = getFolderPath({ fileType: 'file' })
  const filesPrefix = `${filesFolderPath}${quotationId}`
  const [files] = await bucket.getFiles({ prefix: filesPrefix })
  const deleteFilePromiseMany = files.map(async (file) => file.delete())
  const deleteFilesResponse = await Promise.allSettled(deleteFilePromiseMany)

  const filesDeletedQty = deleteFilesResponse.filter((result) => {
    if (result.status === 'fulfilled') {
      return true
    }

    return false
  }).length

  if (statusCode === 204) {
    res
      .status(httpStatus.success_200)
      .json({ message: 'deleted', filesDeletedQty })

    return
  }

  res
    .status(httpStatus.notFound_404)
    .json({ message: 'not deleted', filesDeletedQty: 0 })
}
