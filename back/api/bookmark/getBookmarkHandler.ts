import { BookmarkModel } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseSafe } from '@back/shared/util/jsonParseSafe'
import type { Item } from '@entities/quotation'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  id: Item['id']
}

export type ResBody = {
  item?: Item
  message: 'found'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'not found'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkHandler: RouterHandler = async (req, res, _next) => {
  const bookmarkId = req.body.id
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
  const document = await BookmarkModel.findOne({ email, id: bookmarkId })

  if (document === null) {
    res.status(httpStatus.notFound_404).json({ message: 'not found' })

    return
  }

  const bookmarkInfo = document.toObject()

  const { path } = getFileInfo({ id: bookmarkId })
  const [fileBuffer] = await bucket.file(path).download()
  const fileAsString = fileBuffer.toString()
  const bookmarkData = jsonParseSafe<Item>(fileAsString)

  if (bookmarkData === undefined) {
    res.status(httpStatus.notFound_404).json({ message: 'not found' })

    return
  }

  res.status(httpStatus.success_200).json({
    message: 'found',
    item: { ...bookmarkData, ...bookmarkInfo },
  })
}
