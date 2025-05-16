import type { Request, Response, NextFunction } from 'express'
import type { Item } from '@entities/quotation'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFileInfo } from '@back/shared/services/storage'
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

export const getBookmarkHandler: RouterHandler = async (req, res, next) => {
  const bookmarkId = req.body.id
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const document = await BookmarkModel.findOne({ email, id: bookmarkId })

  if (document === null) {
    res.status(httpStatus.notFound_404).json({ message: 'not found' })

    return
  }

  const { path } = getFileInfo({ id: bookmarkId })
  const [fileBuffer] = await bucket.file(path).download()
  const fileAsString = fileBuffer.toString()
  const item = jsonParseSafe<Item>(fileAsString)

  if (item === undefined) {
    res.status(httpStatus.notFound_404).json({ message: 'not found' })

    return
  }

  res.status(httpStatus.success_200).json({
    message: 'found',
    item: { ...item, ...document },
  })
}
