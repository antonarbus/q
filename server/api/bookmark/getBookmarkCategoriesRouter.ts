import { ItemModel } from '@server/db/models/itemModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyAccessTokenMiddleware'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '@server/utils/getEmailFromRefreshTokenOrThrowUnauthorized'
import { Router } from 'express'
import { type Item } from '@entities/bookmark'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type Next, type Req } from '../../types'

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'Unhandled error'
  categories?: Array<Item['category']>
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getBookmarkCategoriesRouter = Router()

const getBookmarkCategories: RouterHandler = async (req, res, next) => {
  try {
    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const categories = await ItemModel
      .find({ email })
      .distinct('category')

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

getBookmarkCategoriesRouter.get(
  '/',
  verifyAccessTokenMiddleware,
  getBookmarkCategories,
)
