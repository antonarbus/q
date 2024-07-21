import { Router } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { BookmarkModel } from '../../db/models/bookmarkModel'
import { verifyAccessTokenMiddleware } from '../../middleware/verifyAccessTokenMiddleware'
import { bucket, storageFolderName } from '../../services/storage'
import type { ResWithBody, ReqWithBody, Next } from '../../types'
import { getEmailFromRefreshTokenOrThrowUnauthorized } from '../../utils/getEmailFromRefreshTokenOrThrowUnauthorized'

export type ReqBody = {
  item: Item
}

export type ResBody = {
  message:
    | ErrorMessageCommon
    | 'not saved'
    | 'saved'
    | 'updated'
    | 'name is not provided'
    | 'category is not provided'
    | 'id is not provided'
  item?: FlattenMaps<Item>
}

type RouterHandler = (
  req: ReqWithBody<ReqBody>,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const saveBookmarkRouter = Router()

const saveBookmark: RouterHandler = async (req, res, next) => {
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

    const existingItem = await BookmarkModel.findOne({
      email,
      id: item.id,
    })

    const isNew = existingItem === null

    const itemDataFromDb = await BookmarkModel.findOneAndUpdate(
      {
        id: item.id,
        email,
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
      { new: true, upsert: true },
    )
      .select({ _id: 0, __v: 0 })
      .lean()

    // if (!itemDataFromDb) {
    //   return res.status(httpStatus.forbidden_403).json({ message: 'not saved' })
    // }

    const filePath = `${email}/${storageFolderName.bookmarks}/${item.id}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify({ ...itemDataFromDb, ...item }, null, 2)
    await file.save(contents)

    return res.status(httpStatus.success_200).json({
      message: isNew ? 'saved' : 'updated',
      item: { ...itemDataFromDb, ...item },
    })
  } catch (error) {
    next(error)
  }
}

saveBookmarkRouter.post('/', verifyAccessTokenMiddleware, (req, res, next) => {
  void saveBookmark(req, res, next)
})
