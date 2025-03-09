import { Router, type Request, type Response, type NextFunction } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, storageFolderName } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { BookmarkModel } from '@back/entities/bookmark'

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
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const saveBookmarkRouter = Router()

const saveBookmark: RouterHandler = async (req, res, next) => {
  try {
    const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })

    const { item } = req.body

    if (!item.name) {
      res
        .status(httpStatus.forbidden_403)
        .json({ message: 'name is not provided' })

      return
    }

    if (!item.category) {
      res
        .status(httpStatus.forbidden_403)
        .json({ message: 'category is not provided' })

      return
    }

    if (!item.id) {
      res
        .status(httpStatus.forbidden_403)
        .json({ message: 'id is not provided' })

      return
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

    const filePath = `${email}/${storageFolderName.bookmarks}/${item.id}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify({ ...itemDataFromDb, ...item }, null, 2)
    await file.save(contents)

    res.status(httpStatus.success_200).json({
      message: isNew ? 'saved' : 'updated',
      item: { ...itemDataFromDb, ...item },
    })
  } catch (error) {
    next(error)
  }
}

saveBookmarkRouter.post('/', saveBookmark)
