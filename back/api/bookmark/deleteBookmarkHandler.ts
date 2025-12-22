import { bookmarksTable } from '@back/entities/bookmark/bookmarksTableSchema'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import type { Item } from '@entities/quotation/type'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  bookmarkId: Item['id']
}

export type ResBody = {
  message: 'deleted'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'did not find' | 'no item in bucket'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteBookmarkHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const [deletedBookmark] = await db
    .delete(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.email, userFromAccessToken.email),
        eq(bookmarksTable.id, req.body.bookmarkId),
      ),
    )
    .returning()

  if (deletedBookmark === undefined) {
    res.status(httpStatus.notFound404).json({ message: 'did not find' })

    return
  }

  res.status(httpStatus.success200).json({ message: 'deleted' })
}
