import { QuotationModel, type QuotationModelType } from '@server/db/models/quotationModel'
import { verifyTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { Router } from 'express'
import { type HydratedDocument } from 'mongoose'
import type { ItemType } from '@entities/items'
import type { Quotation } from '@entities/quotation'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  quotation: Quotation
  items: ItemType[]
}

export type ResBody = {
  message: string
  document: HydratedDocument<QuotationModelType> | null
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveQuotationRouter = Router()

export const saveQuotation: RouterHandler = async (req, res, next) => {
  try {
    if (req.body.quotation.id === undefined) {
      const document = await QuotationModel.create({
        email: req.headers.email,
      })

      return res.json({
        message: 'quotation saved',
        document,
      })
    } else {
      const document = await QuotationModel.findOneAndUpdate({
        email: req.headers.email,
        id: req.body.quotation.id,
      }, {
        // updatedAt: Date.now(), // no need to set it manually
      }, {
        new: true,
      })

      if (document === null) {
        return res.status(404).json({
          message: 'not found',
          document: null,
        })
      }

      return res.json({
        message: 'quotation updated',
        document,
      })
    }
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyTokenMiddleware, saveQuotation)
