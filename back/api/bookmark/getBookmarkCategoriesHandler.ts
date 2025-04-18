import type { Request, Response, NextFunction } from 'express'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { BookmarkModel } from '@back/entities/bookmark'

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'Unhandled error'
  categories?: Item['category'][]
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkCategoriesHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const categories = await BookmarkModel.find({ email }).distinct('category')
  res.status(httpStatus.success_200).json({ message: 'Found', categories })
}
