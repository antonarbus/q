import { ItemModel } from '@server/db/models/itemModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { bucket } from '@server/services/storage'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '@server/utils/getEmailFromRefreshTokenOrThrowUnauthorized'
import { Router } from 'express'
import { type FlattenMaps } from 'mongoose'
import { type Copyable } from '@entities/item'
import { type ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  item: Copyable
}

export type ResBody = {
  message: ErrorMessageCommon
  | 'not saved'
  | 'saved'
  | 'updated'
  | 'name is not provided'
  | 'category is not provided'
  | 'id is not provided'
  item?: FlattenMaps<Copyable>
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveItemRouter = Router()

const saveItem: RouterHandler = async (req, res, next) => {
  try {
    const email = getEmailFromRefreshTokenOrThrowUnauthorized(req)

    const { item } = req.body

    if (!item.name) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'name is not provided' })
    }

    if (!item.category) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'category is not provided' })
    }

    if (!item.id) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'id is not provided' })
    }

    const existingItem = await ItemModel.findOne({
      email,
      name: item.name,
      category: item.category,
    })

    const isNew = existingItem === null

    const itemDataFromDb = await ItemModel
      .findOneAndUpdate(
        {
          email,
          name: item.name,
          category: item.category,
        },
        {
          id: item.id,
          email,
          type: item.type,
          name: item.name,
          category: item.category,
          desc: item.desc,
          updatedAt: Date.now(),
          ...(isNew && { createdAt: Date.now() }),
        },
        {
          new: true,
          upsert: true,
        },
      )
      .select({ _id: 0, __v: 0 })
      .lean()

    if (!itemDataFromDb) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not saved' })
    }

    const filePath = `${email}/items/${item.id}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify({ ...itemDataFromDb, ...item }, null, 2)
    await file.save(contents)

    return res
      .status(httpStatus.success_200)
      .json({
        message: isNew ? 'saved' : 'updated',
        item: { ...itemDataFromDb, ...item },
      })
  } catch (error) {
    next(error)
  }
}

saveItemRouter.post('/', verifyAccessTokenMiddleware, saveItem)
