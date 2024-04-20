import { QuotationModel } from '@server/db/models/quotationModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { verifyRefreshToken } from '@server/services/jwt'
import { bucket } from '@server/services/storage'
import { Router } from 'express'
import { type HydratedDocument } from 'mongoose'
import { type Quotation } from '@entities/quotation/types'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  message: 'not logged in' | 'did not find' | 'deleted' | 'internal error' | 'not deleted'
  document?: HydratedDocument<Quotation>
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const deleteQuotationRouter = Router()

const deleteQuotation: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = jwtPayload?.email

    if (typeof email !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const { id } = req.body

    const deleteFromDbResult = await QuotationModel.deleteOne({ email, id })

    if (deleteFromDbResult.deletedCount === 0) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'did not find' })
    }

    // const [files] = await bucket.getFiles({ prefix: `${email}/${id}/` })
    // await Promise.all(files.map(async file => await file.delete()))

    const filePath = `${email}/quotations/${id}.json`
    const [{ statusCode }] = await bucket.file(filePath).delete()

    if (statusCode === 204) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'deleted' })
    }

    return res
      .status(httpStatus.notFound_404)
      .json({ message: 'not deleted' })
  } catch (error) {
    return res
      .status(httpStatus.serverError_500)
      .json({ message: 'internal error' })
    // next(error)
  }
}

deleteQuotationRouter.delete(
  '/',
  verifyAccessTokenMiddleware,
  deleteQuotation,
)
