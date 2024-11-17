import { Router, type Request, type Response, type NextFunction } from 'express'
import type { Item } from '@entities/quotation'
import { httpStatus } from '../../consts/httpStatus'
import { BookmarkModel } from '../../db/models/bookmarkModel'
import { bucket, storageFolderName } from '../../services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '../../utils/jwt'
import { jsonParseSafe } from '@back/utils/jsonParseSafe'

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
    const { id } = req.body

    const { email } = getUserFromAccessTokenOrThrowUnauthorized(req)

    const document = await BookmarkModel.findOne({ email, id })

    if (!document) {
      res.status(httpStatus.notFound_404).json({ message: 'not found' })

      return
    }

    const filePath = `${email}/${storageFolderName.bookmarks}/${id}.json`

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
