import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { BookmarkModel } from '../../db/models/bookmarkModel'
import { Router, type Request, type Response, type NextFunction } from 'express'
import { getUserFromAccessTokenOrThrowUnauthorized } from '../../utils/jwt'

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'Unhandled error'
  categories?: Item['category'][]
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkCategoriesRouter = Router()

const getBookmarkCategories: RouterHandler = async (req, res, next) => {
  try {
    const { email } = getUserFromAccessTokenOrThrowUnauthorized(req)

    const categories = await BookmarkModel.find({ email }).distinct('category')

    res.status(httpStatus.success_200).json({ message: 'Found', categories })
  } catch (error) {
    next(error)
  }
}

getBookmarkCategoriesRouter.get('/', getBookmarkCategories)
