import { QuotationModel } from '@back/entities/quotation'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import type { Quotation } from '@entities/quotation'
import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  categories: Quotation['category'][]
  message: 'Found'
}

export type ErrorResBody = {
  message: ErrorMessageCommon
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationCategoriesHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
  const categories = await QuotationModel.find({ email }).distinct('category')
  res.status(httpStatus.success_200).json({ message: 'Found', categories })
}
