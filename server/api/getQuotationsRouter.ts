import { QuotationModel } from '@server/db/models/quotationModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { verifyRefreshToken } from '@server/services/jwt'
import { Router } from 'express'
import { type FlattenMaps } from 'mongoose'
import { type Quotation } from '@entities/quotation'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type Next, type Req } from '../types'

export type ResBody = {
  message: 'not logged in' | 'found' | 'no content' | 'internal error' | 'something happened'
  documents?: Array<FlattenMaps<Quotation>>
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationsRouter = Router()

const getQuotations: RouterHandler = async (req, res, next) => {
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

    const documents = await QuotationModel
      .find({ email })
      .sort({ updatedAt: -1 })
      .select({ _id: 0, __v: 0, email: 0 })
      .lean()

    if (documents.length === 0) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'no content', documents })
    }

    if (documents.length) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'found', documents })
    }

    return res
      .status(httpStatus.notFound_404)
      .json({ message: 'something happened' })
  } catch (error) {
    return res
      .status(httpStatus.serverError_500)
      .json({ message: 'internal error' })
    // next(error)
  }
}

getQuotationsRouter.get(
  '/',
  verifyAccessTokenMiddleware,
  getQuotations,
)
