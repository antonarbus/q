import type { Request, Response, NextFunction } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import type { Pretty } from '@shared/types/Pretty'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'

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
  | 'viewedAt'
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

export const getQuotationsHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })

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
}
