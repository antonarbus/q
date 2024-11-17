import { Router, type Request, type Response, type NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/consts/httpStatus'
import { BookmarkModel } from '@back/db/models/bookmarkModel'
import { bucket, storageFolderName } from '@back/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/utils/jwt'
import type { Item } from '@entities/quotation/types'

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
  try {
    const { email } = getUserFromAccessTokenOrThrowUnauthorized(req)
    const { id } = req.body

    const deleteFromDbResult = await BookmarkModel.deleteOne({ email, id })

    if (deleteFromDbResult.deletedCount === 0) {
      res.status(httpStatus.notFound_404).json({ message: 'did not find' })

      return
    }

    const [files] = await bucket.getFiles({
      prefix: `${email}/${storageFolderName.bookmarks}/${id}.json`,
    })

    if (files.length === 0) {
      res.status(httpStatus.notFound_404).json({ message: 'no item in bucket' })

      return
    }

    await Promise.all(files.map(async (file) => file.delete()))

    res.status(httpStatus.success_200).json({ message: 'deleted' })
  } catch (error) {
    next(error)
  }
}

deleteBookmarkRouter.delete('/', deleteBookmark)
