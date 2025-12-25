import { bookmarksTable, type SelectBookmark } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  bookmarkId: SelectBookmark['id']
}

export type ResBody = {
  message: 'deleted'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'not found' | 'no item in bucket'
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

  const deleteResponse = await db
    .delete(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.email, userFromAccessToken.email),
        eq(bookmarksTable.id, req.body.bookmarkId),
      ),
    )

  if (deleteResponse.rowCount === 0) {
    res.status(httpStatusCode.notFound404).json({ message: 'not found' })

    return
  }

  const fileInfo = getFileInfo({ id: req.body.bookmarkId })
  const [{ statusCode }] = await bucket.file(fileInfo.path).delete()

  if (statusCode === 204) {
    res.status(httpStatusCode.success200).json({ message: 'deleted' })

    return
  }

  res.status(httpStatusCode.notFound404).json({ message: 'no item in bucket' })
}
