import { GetSignedUrlResponse } from '@google-cloud/storage'
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

export const getQuotationRouter = Router()

const getQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { id } = req.body

    const refreshJwtToken = req.cookies.refreshJwtToken

    // todo: make a logic to return shared offer for non-logged-in user
    if (typeof refreshJwtToken !== 'string') {
      return res.status(200).json({ message: 'not logged in' })
    }

    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      return res.status(200).json({ message: 'not logged in' })
    }

    const document = await QuotationModel.findOne({ email, id })

    if (document === null) {
      return res.status(200).json({ message: 'not found' })
    }

    const oneHour = Date.now() + 3600 * 1000
    const filePath = `${email}/${id}/quotation-${document.version}.json`

    const jsonSignedUrlRes = await bucket.file(filePath).getSignedUrl({
      action: 'read',
      expires: oneHour,
    })

    const jsonSignedUrl = jsonSignedUrlRes.at(0)

    if (jsonSignedUrl === undefined) {
      return res.status(200).json({ message: 'json url is not generated' })
    }

    return res.status(200).json({
      message: 'found',
      document,
      jsonSignedUrl,
    })
  } catch (error) {
    next(error)
  }
}

getQuotationRouter.post(
  '/',
  // verifyTokenMiddleware,
  getQuotation,
)
