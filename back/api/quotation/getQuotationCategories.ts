import type { Request, Response, NextFunction } from 'express'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'Unhandled error'
  categories: Quotation['category'][]
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationCategoriesHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const categories = await QuotationModel.find({ email }).distinct('category')
  res.status(httpStatus.success_200).json({ message: 'Found', categories })
}
