import type { Request, Response, NextFunction } from 'express'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { BookmarkModel } from '@back/entities/bookmark'

export type ItemPick = Pick<
  Item,
  'id' | 'name' | 'category' | 'desc' | 'type' | 'createdAt' | 'updatedAt'
>

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'No content' | 'Unhandled error'
  bookmarks: ItemPick[]
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkListHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const bookmarks = await BookmarkModel.find(
    { email },
    {
      _id: 0,
      id: 1,
      name: 1,
      category: 1,
      desc: 1,
      type: 1,
      createdAt: 1,
      updatedAt: 1,
      email: 1,
    },
  ).lean()

  if (bookmarks.length === 0) {
    res
      .status(httpStatus.success_200)
      .json({ message: 'No content', bookmarks })

    return
  }

  if (bookmarks.length !== 0) {
    res.status(httpStatus.success_200).json({ message: 'Found', bookmarks })

    return
  }

  res
    .status(httpStatus.notFound_404)
    .json({ message: 'Unhandled error', bookmarks: [] })
}
