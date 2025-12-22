import { type SelectBookmark, bookmarksTable } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseSafe } from '@back/shared/util/jsonParseSafe'
import type { Item } from '@entities/quotation/type'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  bookmarkId: SelectBookmark['id']
}

export type ResBody = {
  bookmark: SelectBookmark
  message: 'found'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'not found'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const [bookmark] = await db
    .select()
    .from(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.email, userFromAccessToken.email),
        eq(bookmarksTable.id, req.body.bookmarkId),
      ),
    )

  if (bookmark === undefined) {
    res.status(httpStatus.notFound404).json({ message: 'not found' })

    return
  }

  const fileInfo = getFileInfo({ id: req.body.bookmarkId })
  const [fileBuffer] = await bucket.file(fileInfo.path).download()
  const fileAsString = fileBuffer.toString()
  const bookmarkData = jsonParseSafe<Item>(fileAsString)

  if (bookmarkData === undefined) {
    res.status(httpStatus.notFound404).json({ message: 'not found' })

    return
  }

  res.status(httpStatus.success200).json({
    message: 'found',
    bookmark: bookmarkData,
  })
}
