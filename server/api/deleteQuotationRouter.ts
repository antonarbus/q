import { QuotationModel, type QuotationModelType } from '@server/db/models/quotationModel'
import { verifyTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { type JwtPayloadExtended, verifyRefreshToken } from '@server/services/jwt'
import { bucket } from '@server/services/storage'
import { Router } from 'express'
import { type HydratedDocument } from 'mongoose'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  id: string
}

export type ResBody = {
  message: string
  document?: HydratedDocument<QuotationModelType>
  jsonSignedUrl?: string
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const deleteQuotationRouter = Router()

const deleteQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { id } = req.body

    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(200)
        .json({ message: 'not logged in' })
    }

    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      return res
        .status(200)
        .json({ message: 'not logged in' })
    }

    const deleteFromDbResult = await QuotationModel.deleteOne({ email, id })

    if (deleteFromDbResult.deletedCount === 0) {
      return res
        .status(200)
        .json({ message: 'did not find' })
    }

    const [files] = await bucket.getFiles({ prefix: `${email}/${id}/` })

    const filesDeletionRes = await Promise.all(files.map(async file => await file.delete()))

    return res
      .status(200)
      .json({ message: 'deleted' })
  } catch (error) {
    next(error)
  }
}

deleteQuotationRouter.delete(
  '/',
  verifyTokenMiddleware,
  deleteQuotation,
)
