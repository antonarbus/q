import { Router } from 'express'
import { type Quotation } from '@entities/quotation'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { QuotationModel } from '../../db/models/quotationModel'
import { verifyAccessTokenMiddleware } from '../../middleware/verifyAccessTokenMiddleware'
import { type ResWithBody, type Next, type Req } from '../../types'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '../../utils/getEmailFromRefreshTokenOrThrowUnauthorized'

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'Unhandled error'
  categories?: Quotation['category'][]
}

type RouterHandler = (
  req: Req,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationCategoriesRouter = Router()

const getQuotationCategories: RouterHandler = async (req, res, next) => {
  try {
    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const categories = await QuotationModel.find({ email }).distinct('category')

    if (categories) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'Found', categories })
    }

    return res
      .status(httpStatus.notFound_404)
      .json({ message: 'Unhandled error' })
  } catch (error) {
    next(error)
  }
}

getQuotationCategoriesRouter.get(
  '/',
  verifyAccessTokenMiddleware,
  getQuotationCategories,
)
