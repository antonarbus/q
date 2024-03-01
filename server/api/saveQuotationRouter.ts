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
  id: string
}

export type ResBody = {
  message: string
  document: HydratedDocument<QuotationModelType> | null
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveQuotationRouter = Router()

const storage = new Storage({
  keyFilename: './quotationapp-8014c-04cff2d88d5b.json',
  projectId: 'quotationapp-8014c',
})

const bucket = storage.bucket(process.env.BUCKET_NAME!)

export const saveQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { items, quotation, id } = req.body
    const email = req.headers.email

    const filter = { email, id }
    const update = { quotation }

    const document = await QuotationModel.findOneAndUpdate(filter, update, {
      new: true,
      setDefaultsOnInsert: true,
      upsert: true,
    })

    const isNew = document.createdAt.toISOString() === document.updatedAt.toISOString()

    if (document === null) {
      return res.status(404).json({
        message: 'not saved',
        document: null,
      })
    }

    const fileName = `${email}/${id}/quotation-${document.version}.json`
    const file = bucket.file(fileName)
    const contents = JSON.stringify({ quotation, items, id }, null, 2)

    await file.save(contents)

    return res.json({
      message: isNew ? 'inserted' : 'saved',
      document,
    })

    // if (document === null) {
    //   return res.status(404).json({
    //     message: 'not found',
    //     document: null,
    //   })
    // }
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyTokenMiddleware, saveQuotation)
