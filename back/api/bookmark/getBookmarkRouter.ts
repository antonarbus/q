import { Router, type Request, type Response, type NextFunction } from 'express'
import type { Item } from '@entities/quotation'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, storageFolderName } from '@back/shared/services/storage'
import { jsonParseSafe } from '@back/shared/utils/jsonParseSafe'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { BookmarkModel } from '@back/entities/bookmark'

export type ReqBody = {
  id: Item['id']
}

export type ResBody = {
  message: 'not logged in' | 'not found' | 'found'
  item?: Item
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkRouter = Router()

const getBookmark: RouterHandler = async (req, res, next) => {
  try {
    const bookmarkId = req.body.id
    const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
    const document = await BookmarkModel.findOne({ email, id: bookmarkId })

    if (!document) {
      res.status(httpStatus.notFound_404).json({ message: 'not found' })

      return
    }

    const filePath = `${email}/${storageFolderName.bookmarks}/${bookmarkId}.json`
    const [fileBuffer] = await bucket.file(filePath).download()
    const fileAsString = fileBuffer.toString()
    const item = jsonParseSafe<Item>(fileAsString)

    if (!item) {
      res.status(httpStatus.notFound_404).json({ message: 'not found' })

      return
    }

    res.status(httpStatus.success_200).json({
      message: 'found',
      item: { ...item, ...document },
    })
  } catch (error) {
    next(error)
  }
}

getBookmarkRouter.post('/', getBookmark)
