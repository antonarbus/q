import { QuotationModel } from '@server/db/models/quotationModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { verifyRefreshToken } from '@server/services/jwt'
import { bucket } from '@server/services/storage'
import { Router } from 'express'
import { type FlattenMaps } from 'mongoose'
import { type Quotation } from '@entities/quotation/types'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  quotation: Quotation
}

export type ResBody = {
  message: 'not logged in' | 'not saved' | 'saved' | 'updated' | 'name is not provided' | 'category is not provided'
  document?: FlattenMaps<Quotation>
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveQuotationRouter = Router()

const saveQuotation: RouterHandler = async (req, res, next) => {
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

    const { name, category } = req.body.quotation

    if (!name) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'name is not provided' })
    }

    if (!category) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'category is not provided' })
    }

    const document = await QuotationModel
      .findOneAndUpdate(
        { email, name, category },
        { ...req.body.quotation, email },
        { new: true, setDefaultsOnInsert: true, upsert: true },
      )
      .select({ _id: 0, __v: 0 })
      .lean() // otherwise in json we get some additional internal data which is not visible via console.log(document), strange

    if (document === null) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not saved' })
    }

    const isNew = document.createdAt?.toISOString() === document.updatedAt?.toISOString()

    const filePath = `${email}/quotations/${req.body.quotation.id}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify({ ...document, ...req.body.quotation }, null, 2)
    await file.save(contents)

    return res
      .status(httpStatus.success_200)
      .json({
        message: isNew ? 'saved' : 'updated',
        document,
      })
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyAccessTokenMiddleware, saveQuotation)
