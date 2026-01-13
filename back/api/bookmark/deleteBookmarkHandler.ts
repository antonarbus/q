import {
  bookmarksTable,
  type SelectBookmark,
} from '@back/entity/bookmark/db/bookmarksTableSchema'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs

export type UrlParam = {
  id: SelectBookmark['id']
}

type ReqBody = undefined

export type ResBody = {
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NOT_FOUND' | 'NO_ITEM_IN_BUCKET'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const deleteBookmarkHandler: RouterHandler = async (req, res, next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const deleteResponse = await db
    .delete(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.email, userFromAccessToken.email),
        eq(bookmarksTable.id, req.params.id),
      ),
    )

  if (deleteResponse.rowCount === 0) {
    messageList.push('Bookmark not found in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Bookmark deleted from database')

  const fileInfo = getFileInfo({ id: req.params.id })
  const [{ statusCode }] = await bucket.file(fileInfo.path).delete()

  if (statusCode === 204) {
    messageList.push('Bookmark deleted from storage')

    return httpJsonResponse({
      statusCode: httpStatusCode.success200,
      body: {
        message: messageList.join(' | '),
      },
    })
  }

  messageList.push('Failed to delete bookmark from storage')

  throw new HttpError<ErrorResBody['errorCode']>({
    errorCode: 'NO_ITEM_IN_BUCKET',
    statusCode: httpStatusCode.notFound404,
    message: messageList.join(' | '),
  })
}
