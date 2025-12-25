import { bookmarksTable, type SelectBookmark } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  bookmarkId: SelectBookmark['id']
}

export type ResBody = {
  message: 'deleted'
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'NOT_FOUND' | 'NO_ITEM_IN_BUCKET'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
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
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: 'Bookmark not found',
    })
  }

  const fileInfo = getFileInfo({ id: req.body.bookmarkId })
  const [{ statusCode }] = await bucket.file(fileInfo.path).delete()

  if (statusCode === 204) {
    res.status(httpStatusCode.success200).json({ message: 'deleted' })

    return
  }

  throw new HttpError<ErrorResBody['errorCode']>({
    errorCode: 'NO_ITEM_IN_BUCKET',
    statusCode: httpStatusCode.notFound404,
    message: 'No item in bucket',
  })
}
