import { ItemModel } from '@server/db/models/itemModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyAccessTokenMiddleware'
import { bucket } from '@server/services/storage'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '@server/utils/getEmailFromRefreshTokenOrThrowUnauthorized'
import { Router } from 'express'
import { type Item } from '@entities/quotation'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../../types'

export type ReqBody = {
  id: Item['id']
}

export type ResBody = {
  message: ErrorMessageCommon | 'did not find' | 'no item in bucket' | 'deleted'
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const deleteBookmarkRouter = Router()

const deleteBookmark: RouterHandler = async (req, res, next) => {
  try {
    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const { id } = req.body

    const deleteFromDbResult = await ItemModel.deleteOne({ email, id })

    if (deleteFromDbResult.deletedCount === 0) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'did not find' })
    }

    const [files] = await bucket.getFiles({ prefix: `${email}/items/${id}.json` })

    if (files.length === 0) {
      return res
        .status(httpStatus.notFound_404)
        .json({ message: 'no item in bucket' })
    }

    await Promise.all(files.map(async file => await file.delete()))

    return res
      .status(httpStatus.success_200)
      .json({ message: 'deleted' })
  } catch (error) {
    next(error)
  }
}

deleteBookmarkRouter.delete(
  '/',
  verifyAccessTokenMiddleware,
  deleteBookmark,
)
