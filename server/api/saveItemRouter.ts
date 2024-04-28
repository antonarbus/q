import { ItemModel } from '@server/db/models/itemModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { verifyRefreshToken } from '@server/services/jwt'
import { bucket } from '@server/services/storage'
import { Router } from 'express'
import { type ItemCopyable } from '@entities/item'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  item: ItemCopyable
}

export type ResBody = {
  message: 'not logged in' | 'not saved' | 'inserted' | 'updated' | 'name is not provided' | 'category is not provided'
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveItemRouter = Router()

const saveItem: RouterHandler = async (req, res, next) => {
  try {
    // const { item, id, email, name  } = req.body
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = jwtPayload?.email

    if (typeof email !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const { name, category } = req.body.item

    if (!name) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'name is not provided' })
    }

    if (!category) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'category is not provided' })
    }

    const document = await ItemModel
      .findOneAndUpdate(
        { email, name, category },
        { ...req.body.item, email },
        { new: true, setDefaultsOnInsert: true, upsert: true },
      )
      .select({ _id: 0, __v: 0 })
      .lean()

    if (document === null) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not saved' })
    }

    const isNew = document.createdAt?.toISOString() === document.updatedAt?.toISOString()

    const filePath = `${email}/items/${req.body.item.id}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify({ item: req.body.item }, null, 2)
    await file.save(contents)

    return res
      .status(httpStatus.created_201)
      .json({ message: isNew ? 'inserted' : 'updated' })
  } catch (error) {
    next(error)
  }
}

saveItemRouter.post('/', verifyAccessTokenMiddleware, saveItem)
