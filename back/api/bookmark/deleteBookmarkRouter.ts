import { Router, type Request, type Response, type NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, storageFolderName } from '@back/shared/services/storage'
import type { Item } from '@entities/quotation'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { BookmarkModel } from '@back/entities/bookmark'
import { asyncHandler } from '@back/shared/utils/asyncHandler'

export type ReqBody = {
  id: Item['id']
}

export type ResBody = {
  message: ErrorMessageCommon | 'did not find' | 'no item in bucket' | 'deleted'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteBookmarkRouter = Router()

const deleteBookmark: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const bookmarkId = req.body.id

  const deleteFromDbResult = await BookmarkModel.deleteOne({
    email,
    id: bookmarkId,
  })

  if (deleteFromDbResult.deletedCount === 0) {
    res.status(httpStatus.notFound_404).json({ message: 'did not find' })

    return
  }

  const [files] = await bucket.getFiles({
    prefix: `${email}/${storageFolderName.bookmarks}/${bookmarkId}.json`,
  })

  if (files.length === 0) {
    res.status(httpStatus.notFound_404).json({ message: 'no item in bucket' })

    return
  }

  await Promise.all(files.map(async (file) => file.delete()))

  res.status(httpStatus.success_200).json({ message: 'deleted' })
}

deleteBookmarkRouter.delete('/', asyncHandler(deleteBookmark))
