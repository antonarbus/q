import { type SelectBookmark, bookmarksTable } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseSafe } from '@back/shared/util/jsonParseSafe'
import type { Item } from '@entities/quotation/type'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  bookmarkId: SelectBookmark['id']
}

export type ResBody = {
  bookmark: Item
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

  const [bookmarkSelected] = await db
    .select()
    .from(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.email, userFromAccessToken.email),
        eq(bookmarksTable.id, req.body.bookmarkId),
      ),
    )

  if (bookmarkSelected === undefined) {
    res.status(httpStatusCode.notFound404).json({ message: 'not found' })

    return
  }

  const bookmarkFileInfo = getFileInfo({ id: req.body.bookmarkId })

  const [bookmarkFileBuffer] = await bucket
    .file(bookmarkFileInfo.path)
    .download()

  const bookmarkFileAsString = bookmarkFileBuffer.toString()
  const bookmarkFileData = jsonParseSafe<Item>(bookmarkFileAsString)

  if (bookmarkFileData === undefined) {
    res.status(httpStatusCode.notFound404).json({ message: 'not found' })

    return
  }

  res.status(httpStatusCode.success200).json({
    message: 'found',
    bookmark: bookmarkFileData,
  })
}
