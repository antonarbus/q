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
  status: string
  message: string
  document: HydratedDocument<QuotationModelType>
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveQuotationRouter = Router()

export const saveQuotation: RouterHandler = async (req, res, next) => {
  try {
    const document: HydratedDocument<QuotationModelType> = await QuotationModel.create({
      email: req.headers.email,
    })

    console.log('🚀 ~ mongoRes:', document)

    return res.json({
      status: 'ok',
      message: 'quotation saved',
      document,
    })
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyTokenMiddleware, saveQuotation)
