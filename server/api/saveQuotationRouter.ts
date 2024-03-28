import { QuotationModel, type QuotationModelType } from '@server/db/models/quotationModel'
import { verifyTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { type JwtPayloadExtended, verifyRefreshToken } from '@server/services/jwt'
import { bucket } from '@server/services/storage'
import { Router } from 'express'
import { type HydratedDocument } from 'mongoose'
import type { ItemType } from '@entities/items'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  quotation: QuotationModelType
  items: ItemType[]
  id: string
}

export type ResBody = {
  message: string
  document?: HydratedDocument<QuotationModelType> | null
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveQuotationRouter = Router()

const saveQuotation: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res.status(200).json({
        message: 'not logged in',
      })
    }

    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      return res.status(200).json({
        message: 'not logged in',
      })
    }

    const { items, quotation, id } = req.body

    const filter = { email, id }
    const update = { quotation }

    const document = await QuotationModel
      .findOneAndUpdate(filter, update, {
        new: true,
        setDefaultsOnInsert: true,
        upsert: true,
      })
      .select({ _id: 0, __v: 0 })

    const isNew = document.createdAt?.toISOString() === document.updatedAt?.toISOString()

    if (document === null) {
      return res
        .status(404)
        .json({
          message: 'not saved',
          document: null,
        })
    }

    const filePath = `${email}/${id}/quotation-${document.version}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify({ quotation, items, id }, null, 2)
    await file.save(contents)

    return res.json({
      message: isNew ? 'inserted' : 'saved',
      document,
    })
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyTokenMiddleware, saveQuotation)
