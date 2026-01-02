import { type SelectBookmark, bookmarksTable } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseSafe } from '@back/shared/util/jsonParseSafe'
import type { Bookmark } from '@root/shared/types/Bookmark'
import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  bookmarkId: SelectBookmark['id']
}

export type ResBody = {
  bookmark: Bookmark
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NOT_FOUND'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getBookmarkHandler: RouterHandler = async (req, res, next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

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
    messageList.push('Bookmark not found in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Bookmark found in database')

  const bookmarkFileInfo = getFileInfo({ id: req.body.bookmarkId })

  const [bookmarkFileBuffer] = await bucket
    .file(bookmarkFileInfo.path)
    .download()
    .catch(() => {
      messageList.push('Bookmark not found in storage')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'NOT_FOUND',
        statusCode: httpStatusCode.notFound404,
        message: messageList.join(' | '),
      })
    })

  messageList.push('Bookmark loaded from storage')

  const bookmarkFileAsString = bookmarkFileBuffer.toString()

  // todo: not good, zod is better but what if shape will change
  const bookmarkFileData =
    jsonParseSafe<ResBody['bookmark']>(bookmarkFileAsString)

  if (bookmarkFileData === undefined) {
    messageList.push('Failed to parse bookmark data')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_FOUND',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  return httpResponse({
    statusCode: httpStatusCode.success200,
    body: {
      bookmark: bookmarkFileData,
      message: messageList.join(' | '),
    },
  })
}
