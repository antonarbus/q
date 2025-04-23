import type { Request, Response, NextFunction } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFilePath } from '@back/shared/services/storage'
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

export const saveBookmarkHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { item: bookmarkItem } = req.body

  if (!bookmarkItem.id) {
    res.status(httpStatus.forbidden_403).json({ message: 'id is not provided' })

    return
  }

  const getBookmarkStatus = async (): Promise<'new' | 'existing'> => {
    const existingItem = await BookmarkModel.findOne({
      email,
      id: bookmarkItem.id,
    })

    if (existingItem === null) {
      return 'new'
    }

    return 'existing'
  }

  const bookmarkStatus = await getBookmarkStatus()

  const bookmarkFromDb = await BookmarkModel.findOneAndUpdate(
    {
      id: bookmarkItem.id,
      email,
    },
    {
      id: bookmarkItem.id,
      email,
      type: bookmarkItem.type,
      name: bookmarkItem.name,
      category: bookmarkItem.category,
      desc: bookmarkItem.desc,
      updatedAt: Date.now(),
      ...(bookmarkStatus === 'new' && { createdAt: Date.now() }),
    },
    {
      new: true,
      upsert: true,
    },
  )
    .select({ _id: 0, __v: 0 })
    .lean()

  const bookmarkFilePath = getFilePath({
    email,
    fileType: 'bookmark',
    bookmarkId: bookmarkItem.id,
  })

  const bookmarkFile = bucket.file(bookmarkFilePath)

  const contents = JSON.stringify(
    { ...bookmarkFromDb, ...bookmarkItem },
    null,
    2,
  )

  await bookmarkFile.save(contents)

  res.status(httpStatus.success_200).json({
    message: bookmarkStatus === 'new' ? 'saved' : 'updated',
    item: { ...bookmarkFromDb, ...bookmarkItem },
  })
}
