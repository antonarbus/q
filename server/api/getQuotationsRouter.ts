import { QuotationModel } from '@server/db/models/quotationModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '@server/utils/getEmailFromRefreshTokenOrThrowUnauthorized'
import { Router } from 'express'
import { type FlattenMaps } from 'mongoose'
import { type Quotation } from '@entities/quotation'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@shared/consts/httpStatus'
import { type Pretty } from '@shared/types/Pretty'
import type { ResWithBody, Next, Req } from '../types'

export type ResBody = Pretty<{
  message: ErrorMessageCommon | 'Found' | 'No content' | 'Unhandled case'
  quotations?: Array<FlattenMaps<Quotation>>
}>

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationsRouter = Router()

const getQuotations: RouterHandler = async (req, res, next) => {
  try {
    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const quotations = await QuotationModel
      .find({ email })
      // .sort({ openedAt: -1 })
      .select({ _id: 0, __v: 0, email: 0 })
      .lean()

    if (quotations.length === 0) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'No content', quotations })
    }

    if (quotations.length) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'Found', quotations })
    }

    return res
      .status(httpStatus.notFound_404)
      .json({ message: 'Unhandled case' })
  } catch (error) {
    next(error)
  }
}

getQuotationsRouter.get(
  '/',
  verifyAccessTokenMiddleware,
  getQuotations,
)
