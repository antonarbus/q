import { QuotationModel } from '@server/db/models/quotationModel'
import { bucket, storageFolderName } from '@server/services/storage'
import { getEmailFromRefreshToken } from '@server/utils/getEmailFromRefreshToken'
import { Router } from 'express'
import { type Quotation } from '@entities/quotation'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../../types'

export type ReqBody = {
  id: Quotation['id']
}

export type ResBody = {
  message: 'not logged in' | 'not found' | 'found'
  quotation?: Quotation
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationRouter = Router()

const getQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { id } = req.body

    const email = getEmailFromRefreshToken(req)

    // todo: make a logic to return shared offer for non-logged-in user
    if (!email) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not logged in' })
    }

    const document = await QuotationModel
      .findOneAndUpdate(
        { email, id },
        { openedAt: Date.now() },
        { new: true },
      )
      .lean()

    if (document === null) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found' })
    }

    const filePath = `${email}/${storageFolderName.quotations}/${id}.json`

    const [fileBuffer] = await bucket.file(filePath).download()

    if (!fileBuffer) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found' })
    }

    const quotation = JSON.parse(fileBuffer.toString())

    return res
      .status(httpStatus.success_200)
      .json({ message: 'found', quotation })
  } catch (error) {
    next(error)
  }
}

getQuotationRouter.post(
  '/',
  getQuotation,
)
