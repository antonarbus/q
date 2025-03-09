import { Router, type Request, type Response, type NextFunction } from 'express'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { QuotationModel } from '@back/shared/db/models/quotationModel'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'Unhandled error'
  categories: Quotation['category'][]
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationCategoriesRouter = Router()

const getQuotationCategories: RouterHandler = async (req, res, next) => {
  try {
    const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })

    const categories = await QuotationModel.find({ email }).distinct('category')

    res.status(httpStatus.success_200).json({ message: 'Found', categories })
  } catch (error) {
    next(error)
  }
}

getQuotationCategoriesRouter.get('/', getQuotationCategories)
