import { BookmarkModel } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import type { Item } from '@entities/quotation'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  id: Item['id']
}

export type ResBody = {
  message: 'deleted'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'did not find' | 'no item in bucket'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteBookmarkHandler: RouterHandler = async (req, res, _next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
  const bookmarkId = req.body.id

  const deleteFromDbResult = await BookmarkModel.deleteOne({
    email,
    id: bookmarkId,
  })

  if (deleteFromDbResult.deletedCount === 0) {
    res.status(httpStatus.notFound_404).json({ message: 'did not find' })

    return
  }

  res.status(httpStatus.success_200).json({ message: 'deleted' })
}
