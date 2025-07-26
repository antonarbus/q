import type { Request, Response, NextFunction } from 'express'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'

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
  next,
) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
  const categories = await QuotationModel.find({ email }).distinct('category')
  res.status(httpStatus.success_200).json({ message: 'Found', categories })
}
