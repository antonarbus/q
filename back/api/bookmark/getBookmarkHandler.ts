import { bookmarksTable } from '@back/entity/bookmark/db/bookmarksTableSchema'
import type { SelectBookmark } from '@back/entity/bookmark/db/bookmarksTableSchema'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { getBucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseOrNull } from '@back/shared/util/jsonParseOrNull'
import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParsedQs } from 'qs'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import type { Bookmark } from '@back/entity/bookmark/schema'
import { validateBookmark } from '@back/entity/bookmark/validateBookmark'

type SearchQuery = ParsedQs

export type UrlParam = {
  id: SelectBookmark['id']
}

type ReqBody = undefined

export type ResBody = {
  bookmark: Bookmark
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCode
    | 'BOOKMARK_NOT_FOUND'
    | 'BOOKMARK_STORAGE_NOT_FOUND'
    | 'BOOKMARK_VALIDATION_ERROR'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getBookmarkHandler: RouterHandler = async (req) => {
  const userFromAccessToken = await getUserFromAccessTokenOrThrowUnauthorized({
    req,
  })

  const messageList: string[] = []

  const [bookmarkSelected] = await db
    .select()
    .from(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.email, userFromAccessToken.email),
        eq(bookmarksTable.id, req.params.id),
      ),
    )

  if (bookmarkSelected === undefined) {
    messageList.push('Bookmark not found in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'BOOKMARK_NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Bookmark found in database')

  const bucket = await getBucket()
  const bookmarkFileInfo = getFileInfo({ id: req.params.id })

  const [bookmarkFileBuffer] = await bucket
    .file(bookmarkFileInfo.path)
    .download()
    .catch(() => {
      messageList.push('Bookmark not found in storage')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'BOOKMARK_STORAGE_NOT_FOUND',
        statusCode: httpStatusCode.notFound404,
        message: messageList.join(' | '),
      })
    })

  messageList.push('Bookmark loaded from storage')

  const bookmarkFileAsString = bookmarkFileBuffer.toString()
  const bookmarkJsonParsed = jsonParseOrNull<Bookmark>(bookmarkFileAsString)

  const bookmarkValidationResult = validateBookmark({
    document: bookmarkJsonParsed ?? {},
  })

  messageList.push(bookmarkValidationResult.message)

  if (bookmarkValidationResult.status === 'ERROR') {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'BOOKMARK_VALIDATION_ERROR',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      bookmark: bookmarkValidationResult.data,
      message: messageList.join(' | '),
    },
  })
}
