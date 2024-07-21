import { Router } from 'express'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { BookmarkModel } from '../../db/models/bookmarkModel'
import { verifyAccessTokenMiddleware } from '../../middleware/verifyAccessTokenMiddleware'
import type { ResWithBody, Next, Req } from '../../types'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '../../utils/getEmailFromRefreshTokenOrThrowUnauthorized'

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'Unhandled error'
  categories?: Item['category'][]
}

type RouterHandler = (
  req: Req,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const getBookmarkCategoriesRouter = Router()

const getBookmarkCategories: RouterHandler = async (req, res, next) => {
  try {
    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const categories = await BookmarkModel.find({ email }).distinct('category')

    return res
      .status(httpStatus.success_200)
      .json({ message: 'Found', categories })

    // return res
    //   .status(httpStatus.notFound_404)
    //   .json({ message: 'Unhandled error' })
  } catch (error) {
    next(error)
  }
}

getBookmarkCategoriesRouter.get(
  '/',
  verifyAccessTokenMiddleware,
  (req, res, next) => {
    void getBookmarkCategories(req, res, next)
  },
)
