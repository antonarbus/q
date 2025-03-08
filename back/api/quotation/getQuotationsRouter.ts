import { Router, type Request, type Response, type NextFunction } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import type { Pretty } from '@shared/types/Pretty'
import { httpStatus } from '@back/consts/httpStatus'
import { QuotationModel } from '@back/db/models/quotationModel'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/utils/headers'

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
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationsRouter = Router()

const getQuotations: RouterHandler = async (req, res, next) => {
  try {
    const { email } = getUserFromAccessTokenOrThrowUnauthorized(req)

    const quotations = await QuotationModel.find(
      { email },
      { _id: 0, __v: 0, email: 0 },
    ).lean()

    if (quotations.length === 0) {
      res
        .status(httpStatus.success_200)
        .json({ message: 'No content', quotations })

      return
    }

    if (quotations.length) {
      res.status(httpStatus.success_200).json({ message: 'Found', quotations })

      return
    }

    res
      .status(httpStatus.notFound_404)
      .json({ message: 'Unhandled case', quotations: [] })
  } catch (error) {
    next(error)
  }
}

getQuotationsRouter.get('/', getQuotations)
