import { QuotationModel } from '@server/db/models/quotationModel'
import { verifyRefreshToken } from '@server/services/jwt'
import { bucket } from '@server/services/storage'
import { Router } from 'express'
import { type FlattenMaps } from 'mongoose'
import { type Item, type Quotation } from '@entities/quotation'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  message: 'not logged in' | 'not found' | 'found'
  document?: FlattenMaps<Quotation>
  jsonSignedUrl?: string
  items?: Item[]
  quotation?: Quotation
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationRouter = Router()

const getQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { id } = req.body

    const refreshJwtToken = req.cookies.refreshJwtToken

    // todo: make a logic to return shared offer for non-logged-in user
    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not logged in' })
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = jwtPayload?.email

    if (typeof email !== 'string') {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not logged in' })
    }

    const document = await QuotationModel
      .findOne({ email, id })
      .lean()

    if (document === null) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found' })
    }

    const oneHour = Date.now() + 3600 * 1000
    const filePath = `${email}/quotations/${id}.json`

    const [exists] = await bucket.file(filePath).exists()

    if (!exists) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found' })
    }

    const jsonSignedUrlRes = await bucket.file(filePath).getSignedUrl({
      action: 'read',
      expires: oneHour,
    })

    const jsonSignedUrl = jsonSignedUrlRes.at(0)

    if (jsonSignedUrl === undefined) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found' })
    }

    return res
      .status(httpStatus.success_200)
      .json({ message: 'found', document, jsonSignedUrl })
  } catch (error) {
    next(error)
  }
}

getQuotationRouter.post(
  '/',
  getQuotation,
)
