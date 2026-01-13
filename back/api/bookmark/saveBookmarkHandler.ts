import {
  bookmarksTable,
  type SelectBookmark,
} from '@back/entity/bookmark/db/bookmarksTableSchema'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'
import { bookmarkSchema, type Bookmark } from '@back/entity/bookmark/schema'
import { z } from 'zod'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  bookmark: Bookmark
}

export type ResBody = {
  bookmark: SelectBookmark
  isNew: boolean
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode:
    | ErrorCode
    | 'BOOKMARK_ID_NOT_PROVIDED'
    | 'BOOKMARK_SAVE_FAILED'
    | 'BOOKMARK_INVALID_STRUCTURE'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const saveBookmarkHandler: RouterHandler = async (req, res, next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const bookmarkValidationResult = bookmarkSchema.safeParse(req.body.bookmark)

  if (bookmarkValidationResult.success === false) {
    messageList.push('Invalid bookmark structure in request')
    const treeifiedError = z.treeifyError(bookmarkValidationResult.error)
    console.error('Validation failed:', treeifiedError)
    messageList.push(`Zod error: ${JSON.stringify(treeifiedError)}`)

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'BOOKMARK_INVALID_STRUCTURE',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Bookmark structure validated')

  if (req.body.bookmark.id === '') {
    messageList.push('Bookmark ID is required')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'BOOKMARK_ID_NOT_PROVIDED',
      statusCode: httpStatusCode.badRequest400,
      message: messageList.join(' | '),
    })
  }

  // const { id, type, name, category, desc, ...bucketData } = req.body.bookmark

  const [bookmarkInserted] = await db
    .insert(bookmarksTable)
    .values({
      id: req.body.bookmark.id,
      email: userFromAccessToken.email,
      type: req.body.bookmark.type,
      name: req.body.bookmark.name,
      category: req.body.bookmark.category,
      desc: req.body.bookmark.desc,
    })
    .onConflictDoUpdate({
      target: bookmarksTable.id,
      set: {
        type: req.body.bookmark.type,
        name: req.body.bookmark.name,
        category: req.body.bookmark.category,
        desc: req.body.bookmark.desc,
        updatedAt: new Date().toISOString(),
      },
    })
    .returning()

  if (bookmarkInserted === undefined) {
    messageList.push('Failed to save bookmark meta data')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'BOOKMARK_SAVE_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  const isNew = bookmarkInserted.createdAt === bookmarkInserted.updatedAt

  messageList.push(
    isNew === true
      ? 'Bookmark created in database'
      : 'Bookmark updated in database',
  )

  const fileInfo = getFileInfo({ id: req.body.bookmark.id })
  const bookmarkFile = bucket.file(fileInfo.path)

  const bookmarkWithUpdatedTimestamps: Bookmark = {
    ...req.body.bookmark,
    createdAt: bookmarkInserted.createdAt,
    updatedAt: bookmarkInserted.updatedAt,
  }

  const contents = JSON.stringify(bookmarkWithUpdatedTimestamps, null, 2)

  await bookmarkFile.save(contents).catch(() => {
    messageList.push('Failed to save bookmark in bucket')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'BOOKMARK_SAVE_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  })

  messageList.push('Bookmark saved in storage')

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      message: messageList.join(' | '),
      bookmark: bookmarkWithUpdatedTimestamps,
      isNew,
    },
  })
}
