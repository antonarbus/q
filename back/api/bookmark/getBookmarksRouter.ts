import { Router } from 'express'
import { type Item } from '@entities/bookmark'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { BookmarkModel } from '../../db/models/bookmarkModel'
import { verifyAccessTokenMiddleware } from '../../middleware/verifyAccessTokenMiddleware'
import { type ResWithBody, type Next, type Req } from '../../types'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '../../utils/getEmailFromRefreshTokenOrThrowUnauthorized'

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'No content' | 'Unhandled error'
  bookmarks?: Item[]
}

type RouterHandler = (
  req: Req,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const getBookmarksRouter = Router()

const getBookmarks: RouterHandler = async (req, res, next) => {
  try {
    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const bookmarks = await BookmarkModel.find({ email })
      // .sort({ updatedAt: -1 })
      .select({ _id: 0, __v: 0, email: 0 })
      .lean()

    if (bookmarks.length === 0) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'No content', bookmarks })
    }

    if (bookmarks.length) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'Found', bookmarks })
    }

    return res
      .status(httpStatus.notFound_404)
      .json({ message: 'Unhandled error' })
  } catch (error) {
    next(error)
  }
}

getBookmarksRouter.get('/', verifyAccessTokenMiddleware, (req, res, next) => {
  void getBookmarks(req, res, next)
})
