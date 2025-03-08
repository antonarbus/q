import { Router, type Request, type Response, type NextFunction } from 'express'
import type { HydratedDocument } from 'mongoose'
import type { Quotation } from '@entities/quotation/types'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/consts/httpStatus'
import { QuotationModel } from '@back/db/models/quotationModel'
import { bucket, storageFolderName } from '@back/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/utils/headers'

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

export const deleteQuotationRouter = Router()

const deleteQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { email } = getUserFromAccessTokenOrThrowUnauthorized(req)

    const { id } = req.body

    const deleteFromDbResult = await QuotationModel.deleteOne({ email, id })

    if (deleteFromDbResult.deletedCount === 0) {
      res.status(httpStatus.notFound_404).json({ message: 'did not find' })

      return
    }

    // const [files] = await bucket.getFiles({ prefix: `${email}/${id}/` })
    // await Promise.all(files.map(async file => await file.delete()))

    const filePath = `${email}/${storageFolderName.quotations}/${id}.json`
    const [{ statusCode }] = await bucket.file(filePath).delete()

    if (statusCode === 204) {
      res.status(httpStatus.success_200).json({ message: 'deleted' })

      return
    }

    res.status(httpStatus.notFound_404).json({ message: 'not deleted' })
  } catch (error) {
    next(error)
  }
}

deleteQuotationRouter.delete('/', deleteQuotation)
