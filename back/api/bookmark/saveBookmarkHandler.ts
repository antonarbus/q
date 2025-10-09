import { BookmarkModel } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatus } from '@back/shared/const/httpStatus'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import type { NextFunction, Request, Response } from 'express'
import type { FlattenMaps } from 'mongoose'

export type ReqBody = {
  item: Item
}

export type ResBody = {
  item?: FlattenMaps<Item>
  message: 'saved' | 'updated'
}

export type ErrorResBody = {
  message:
    | ErrorMessageCommon
    | 'name is not provided'
    | 'category is not provided'
    | 'id is not provided'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const saveBookmarkHandler: RouterHandler = async (req, res, _next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
  const { item: bookmarkItem } = req.body

  if (bookmarkItem.id === '') {
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

  const { path } = getFileInfo({ id: bookmarkItem.id })
  const bookmarkFile = bucket.file(path)

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
