import { Router } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import type { Pretty } from '@shared/types/Pretty'
import { httpStatus } from '../../consts/httpStatus'
import { QuotationModel } from '../../db/models/quotationModel'
import type { ResWithBody, Next, Req } from '../../types'
import { getUserFromAccessTokenOrThrowUnauthorized } from '../../utils/jwt'

export type QuotationPick = Pick<
  Quotation,
  | 'category'
  | 'createdAt'
  | 'desc'
  | 'id'
  | 'info'
  | 'name'
  | 'openedAt'
  | 'sharedWith'
  | 'updatedAt'
>

export type ResBody = Pretty<{
  message: ErrorMessageCommon | 'Found' | 'No content' | 'Unhandled case'
  quotations: FlattenMaps<QuotationPick>[]
}>

type RouterHandler = (
  req: Req,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationsRouter = Router()

const getQuotations: RouterHandler = async (req, res, next) => {
  try {
    const { email } = getUserFromAccessTokenOrThrowUnauthorized(req)

    const quotations = await QuotationModel.find(
      { email },
      { _id: 0, __v: 0, email: 0 },
    ).lean()

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
      .json({ message: 'Unhandled case', quotations: [] })
  } catch (error) {
    next(error)
  }
}

getQuotationsRouter.get('/', (req, res, next) => {
  void getQuotations(req, res, next)
})
