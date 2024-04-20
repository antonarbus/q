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
  message: 'not logged in' | 'not owner' | 'not saved' | 'inserted' | 'saved'
  document?: FlattenMaps<Quotation>
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveQuotationRouter = Router()

const saveQuotation: RouterHandler = async (req, res, next) => {
  try {
    const { quotation } = req.body
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

    if (email !== quotation?.email) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not owner' })
    }

    const document = await QuotationModel
      .findOneAndUpdate(
        { email: quotation.email, id: quotation.id },
        { quotation },
        { new: true, setDefaultsOnInsert: true, upsert: true },
      )
      .select({ _id: 0, __v: 0 })
      .lean() // otherwise in json we get some additional internal data which is not visible via console.log(document), strange

    const isNew = document.createdAt?.toISOString() === document.updatedAt?.toISOString()

    if (document === null) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not saved' })
    }

    const filePath = `${email}/quotations/${quotation.id}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify({ ...document, ...quotation }, null, 2)
    await file.save(contents)

    return res
      .status(httpStatus.success_200)
      .json({
        message: isNew ? 'inserted' : 'saved',
        document,
      })
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyAccessTokenMiddleware, saveQuotation)
