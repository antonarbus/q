import { BookmarkModel } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import type { Item } from '@entities/quotation'
import type { NextFunction, Request, Response } from 'express'

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
  _next,
) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
  const categories = await BookmarkModel.find({ email }).distinct('category')
  res.status(httpStatus.success_200).json({ message: 'Found', categories })
}
