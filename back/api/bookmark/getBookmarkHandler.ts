import {
  type SelectBookmark,
  bookmarksTable,
} from '@back/entities/bookmark/bookmarksTableSchema'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user/getUserFromAccessTokenOrThrowUnauthorized'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq } from 'drizzle-orm'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseOrNull } from '@back/shared/util/jsonParseOrNull'
import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'
import {
  bookmarkSchema,
  type Bookmark,
} from '@back/entities/bookmark/bookmarkSchema'
import { z } from 'zod'

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
  errorCode: ErrorCode | 'NOT_FOUND' | 'INVALID_JSON' | 'INVALID_STRUCTURE'
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
  const bookmarkJsonParsed = jsonParseOrNull<Bookmark>(bookmarkFileAsString)

  if (bookmarkJsonParsed === null) {
    messageList.push('Bookmark data from storage is not valid JSON')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'INVALID_JSON',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  const bookmarkValidationResult = bookmarkSchema.safeParse(bookmarkJsonParsed)

  if (bookmarkValidationResult.success === false) {
    messageList.push('Invalid bookmark structure')
    const treeifiedError = z.treeifyError(bookmarkValidationResult.error)
    console.error('Validation failed:', treeifiedError)
    messageList.push(`Zod error: ${JSON.stringify(treeifiedError)}`)

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'INVALID_STRUCTURE',
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
