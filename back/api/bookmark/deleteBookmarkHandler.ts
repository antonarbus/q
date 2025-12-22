import { bookmarksTable } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
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
    res.status(httpStatus.notFound404).json({ message: 'not found' })

    return
  }

  const fileInfo = getFileInfo({ id: req.body.bookmarkId })
  const [{ statusCode }] = await bucket.file(fileInfo.path).delete()

  if (statusCode === 204) {
    res.status(httpStatus.success200).json({ message: 'deleted' })

    return
  }

  res.status(httpStatus.notFound404).json({ message: 'no item in bucket' })
}
