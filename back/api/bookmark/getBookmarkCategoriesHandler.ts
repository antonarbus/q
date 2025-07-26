import type { Request, Response, NextFunction } from 'express'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { BookmarkModel } from '@back/entities/bookmark'

export type ResBody = {
  categories?: Item['category'][]
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

export const getBookmarkCategoriesHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
  const categories = await BookmarkModel.find({ email }).distinct('category')
  res.status(httpStatus.success_200).json({ message: 'Found', categories })
}
