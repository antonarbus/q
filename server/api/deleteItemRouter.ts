import { ItemModel } from '@server/db/models/itemModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { type JwtPayloadExtended, verifyRefreshToken } from '@server/services/jwt'
import { bucket } from '@server/services/storage'
import { Router } from 'express'
import { type Item } from '@entities/quotation'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  id: Item['id']
}

export type ResBody = {
  message: 'not logged in' | 'did not find' | 'no item in bucket' | 'deleted'
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const deleteItemRouter = Router()

const deleteItem: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not logged in' })
    }

    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not logged in' })
    }

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

deleteItemRouter.delete(
  '/',
  verifyAccessTokenMiddleware,
  deleteItem,
)
