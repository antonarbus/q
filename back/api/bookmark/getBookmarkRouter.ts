import { Router } from 'express'
import type { Item } from '@entities/quotation'
import { httpStatus } from '../../consts/httpStatus'
import { BookmarkModel } from '../../db/models/bookmarkModel'
import { verifyAccessTokenMiddleware } from '../../middleware/verifyAccessTokenMiddleware'
import { bucket, storageFolderName } from '../../services/storage'
import type { ResWithBody, ReqWithBody, Next } from '../../types'
import { getUserFromRefreshTokenOrThrowUnauthorized } from '../../utils/getUserFromRefreshTokenOrThrowUnauthorized'
import { jsonParseSafe } from '@back/utils/jsonParseSafe'

export type ReqBody = {
  id: Item['id']
}

export type ResBody = {
  message: 'not logged in' | 'not found' | 'found'
  item?: Item
}

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const getBookmarkRouter = Router()

const getBookmark: RouterHandler = async (req, res, next) => {
  try {
    const { id } = req.body

    const { email } = getUserFromRefreshTokenOrThrowUnauthorized(req)

    const document = await BookmarkModel.findOne({ email, id })

    if (!document) {
      return res.status(httpStatus.notFound_404).json({ message: 'not found' })
    }

    const filePath = `${email}/${storageFolderName.bookmarks}/${id}.json`

    const [fileBuffer] = await bucket.file(filePath).download()

    const fileAsString = fileBuffer.toString()

    const item = jsonParseSafe<Item>(fileAsString)

    if (!item) {
      return res.status(httpStatus.notFound_404).json({ message: 'not found' })
    }

    return res.status(httpStatus.success_200).json({
      message: 'found',
      item: { ...item, ...document },
    })
  } catch (error) {
    next(error)
  }
}

getBookmarkRouter.post('/', verifyAccessTokenMiddleware, (req, res, next) => {
  void getBookmark(req, res, next)
})
