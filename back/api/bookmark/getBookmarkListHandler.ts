import { type SelectBookmark, bookmarksTable } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  bookmarkList: SelectBookmark[]
  message: 'Found' | 'No content'
}

export type ErrorResBody = {
  bookmarkList: SelectBookmark[]
  message: ErrorMessageCommon | 'Unhandled error'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkListHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const bookmarkList = await db
    .select()
    .from(bookmarksTable)
    .where(eq(bookmarksTable.email, userFromAccessToken.email))

  if (bookmarkList.length === 0) {
    res
      .status(httpStatus.success200)
      .json({ message: 'No content', bookmarkList })

    return
  }

  if (bookmarkList.length !== 0) {
    res.status(httpStatus.success200).json({ message: 'Found', bookmarkList })

    return
  }

  res
    .status(httpStatus.notFound404)
    .json({ message: 'Unhandled error', bookmarkList: [] })
}
