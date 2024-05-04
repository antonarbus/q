import { QuotationModel } from '@server/db/models/quotationModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { verifyRefreshToken } from '@server/services/jwt'
import { Router } from 'express'
import { type Quotation } from '@entities/quotation'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type Next, type Req } from '../types'

export type ResBody = {
  message: 'not logged in' | 'found' | 'internal error' | 'something happened'
  categories?: Array<Quotation['category']>
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationCategoriesRouter = Router()

const getQuotationCategories: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = jwtPayload?.email

    if (typeof email !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const categories = await QuotationModel
      .find({ email })
      .distinct('category')

    if (categories) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'found', categories })
    }

    return res
      .status(httpStatus.notFound_404)
      .json({ message: 'something happened' })
  } catch (error) {
    return res
      .status(httpStatus.serverError_500)
      .json({ message: 'internal error' })
    // next(error)
  }
}

getQuotationCategoriesRouter.get(
  '/',
  verifyAccessTokenMiddleware,
  getQuotationCategories,
)
