import { BookmarkModel } from '@server/db/models/bookmarkModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyAccessTokenMiddleware'
import { bucket } from '@server/services/storage'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '@server/utils/getEmailFromRefreshTokenOrThrowUnauthorized'
import { Router } from 'express'
import { type Item } from '@entities/quotation'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../../types'

export type ReqBody = {
  id: Item['id']
}

export type ResBody = {
  message: 'not logged in' | 'not found' | 'found'
  item?: Item
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getBookmarkRouter = Router()

const getBookmark: RouterHandler = async (req, res, next) => {
  try {
    const { id } = req.body

    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const document = await BookmarkModel
      .findOne({ email, id })
      .lean()

    if (!document) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found' })
    }

    const filePath = `${email}/bookmarks/${id}.json`

    const [fileBuffer] = await bucket.file(filePath).download()

    if (!fileBuffer) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'not found' })
    }

    const item = JSON.parse(fileBuffer.toString())

    return res
      .status(httpStatus.success_200)
      .json({
        message: 'found',
        item: { ...item, ...document },
      })
  } catch (error) {
    next(error)
  }
}

getBookmarkRouter.post(
  '/',
  verifyAccessTokenMiddleware,
  getBookmark,
)
