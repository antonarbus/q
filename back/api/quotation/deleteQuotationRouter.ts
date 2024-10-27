import { Router } from 'express'
import type { HydratedDocument } from 'mongoose'
import type { Quotation } from '@entities/quotation/types'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { QuotationModel } from '../../db/models/quotationModel'
import { verifyAccessTokenMiddleware } from '../../middleware/verifyAccessTokenMiddleware'
import { bucket, storageFolderName } from '../../services/storage'
import type { ResWithBody, ReqWithBody, Next } from '../../types'
import { getUserFromRefreshTokenOrThrowUnauthorized } from '../../utils/getUserFromRefreshTokenOrThrowUnauthorized'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  message:
    | ErrorMessageCommon
    | 'did not find'
    | 'deleted'
    | 'internal error'
    | 'not deleted'
  document?: HydratedDocument<Quotation>
}

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const deleteQuotationRouter = Router()

const deleteQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { email } = getUserFromRefreshTokenOrThrowUnauthorized(req)

    const { id } = req.body

    const deleteFromDbResult = await QuotationModel.deleteOne({ email, id })

    if (deleteFromDbResult.deletedCount === 0) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'did not find' })
    }

    // const [files] = await bucket.getFiles({ prefix: `${email}/${id}/` })
    // await Promise.all(files.map(async file => await file.delete()))

    const filePath = `${email}/${storageFolderName.quotations}/${id}.json`
    const [{ statusCode }] = await bucket.file(filePath).delete()

    if (statusCode === 204) {
      return res.status(httpStatus.success_200).json({ message: 'deleted' })
    }

    return res.status(httpStatus.notFound_404).json({ message: 'not deleted' })
  } catch (error) {
    next(error)
  }
}

deleteQuotationRouter.delete(
  '/',
  verifyAccessTokenMiddleware,
  (req, res, next) => {
    void deleteQuotation(req, res, next)
  },
)
