import { type SelectBookmark, bookmarksTable } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseSafe } from '@back/shared/util/jsonParseSafe'
import type { Bookmark } from '@entities/bookmark/type'
import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  bookmarkId: SelectBookmark['id']
}

export type ResBody = {
  bookmark: Bookmark
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NOT_FOUND'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkHandler: RouterHandler = async (req, res) => {
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
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: 'Bookmark not found',
    })
  }

  const bookmarkFileInfo = getFileInfo({ id: req.body.bookmarkId })

  const [bookmarkFileBuffer] = await bucket
    .file(bookmarkFileInfo.path)
    .download()
    .catch(() => {
      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'NOT_FOUND',
        statusCode: httpStatusCode.notFound404,
        message: 'Bookmark not found in bucket',
      })
    })

  const bookmarkFileAsString = bookmarkFileBuffer.toString()

  // todo: not good, zod is better but what if shape will change
  const bookmarkFileData =
    jsonParseSafe<ResBody['bookmark']>(bookmarkFileAsString)

  if (bookmarkFileData === undefined) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_FOUND',
      statusCode: httpStatusCode.serverError500,
      message: 'Failed to parse file data',
    })
  }

  res.status(httpStatusCode.success200).json({
    bookmark: bookmarkFileData,
  })
}
