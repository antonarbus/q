import { QuotationModel } from '@back/entities/quotation'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatus } from '@back/shared/const/httpStatus'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import type { Pretty } from '@shared/type/Pretty'
import type { NextFunction, Request, Response } from 'express'
import type { FlattenMaps } from 'mongoose'

export type QuotationPick = Pick<
  Quotation,
  | 'category'
  | 'createdAt'
  | 'desc'
  | 'id'
  | 'info'
  | 'name'
  | 'openedAt'
  | 'access'
  | 'viewedAt'
  | 'updatedAt'
>

export type ResBody = Pretty<{
  quotations: FlattenMaps<QuotationPick>[]
  message: 'Found' | 'No content'
}>

export type ErrorResBody = {
  quotations: FlattenMaps<QuotationPick>[]
  message: ErrorMessageCommon | 'Unhandled case'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationListHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })

  const documents = await QuotationModel.find(
    { email },
    { _id: 0, __v: 0, email: 0 },
  )

  if (documents.length === 0) {
    res
      .status(httpStatus.success_200)
      .json({ message: 'No content', quotations: [] })

    return
  }

  if (documents.length !== 0) {
    const quotations = documents.map((doc) => doc.toObject({ getters: true }))
    res.status(httpStatus.success_200).json({ message: 'Found', quotations })

    return
  }

  res
    .status(httpStatus.notFound_404)
    .json({ message: 'Unhandled case', quotations: [] })
}
