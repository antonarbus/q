import { Storage } from '@google-cloud/storage'
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
    const email = req.headers.email
    if (req.body.quotation.id === undefined) {
      const document = await QuotationModel.create({ email })

      const storage = new Storage({
        keyFilename: './quotationapp-8014c-04cff2d88d5b.json',
        projectId: 'quotationapp-8014c',
      })

      const bucket = storage.bucket(process.env.BUCKET_NAME!)
      const fileName = `${document.email}/${document.id}/quotation-${document.version}.json`
      const file = bucket.file(fileName)
      const data = {
        quotation: document,
        items: req.body.items,
      }
      const contents = JSON.stringify(data, null, 2)
      await file.save(contents)

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
