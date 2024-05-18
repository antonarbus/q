import { BookmarkModel } from '@server/db/models/bookmarkModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyAccessTokenMiddleware'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '@server/utils/getEmailFromRefreshTokenOrThrowUnauthorized'
import { Router } from 'express'
import { type Item } from '@entities/bookmark'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type Next, type Req } from '../../types'

export type ResBody = {
  message: ErrorMessageCommon | 'found' | 'no content' | 'Unhandled error'
  documents?: Item[]
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getBookmarksRouter = Router()

const getBookmarks: RouterHandler = async (req, res, next) => {
  try {
    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const documents = await BookmarkModel
      .find({ email })
      // .sort({ updatedAt: -1 })
      .select({ _id: 0, __v: 0, email: 0 })
      .lean()

    if (documents.length === 0) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'no content', documents })
    }

    if (documents.length) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'found', documents })
    }

    return res
      .status(httpStatus.notFound_404)
      .json({ message: 'Unhandled error' })
  } catch (error) {
    next(error)
  }
}

getBookmarksRouter.get(
  '/',
  verifyAccessTokenMiddleware,
  getBookmarks,
)
