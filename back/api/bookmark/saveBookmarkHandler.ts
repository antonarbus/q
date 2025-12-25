import {
  bookmarksTable,
  type InsertBookmark,
  type SelectBookmark,
} from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  bookmark: Required<
    Pick<InsertBookmark, 'id' | 'type' | 'name' | 'category' | 'desc'>
  >
}

export type ResBody = {
  bookmark: SelectBookmark
  message: 'saved' | 'updated'
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'ID_NOT_PROVIDED' | 'FAILED_TO_SAVE'
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const saveBookmarkHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  if (req.body.bookmark.id === '') {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'ID_NOT_PROVIDED',
      statusCode: httpStatusCode.badRequest400,
      message: 'Bookmark ID is required',
    })
  }

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
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'FAILED_TO_SAVE',
      statusCode: httpStatusCode.serverError500,
      message: 'Failed to save bookmark',
    })
  }

  const fileInfo = getFileInfo({ id: req.body.bookmark.id })
  const bookmarkFile = bucket.file(fileInfo.path)

  const contents = JSON.stringify(
    { ...bookmarkInserted, ...req.body.bookmark },
    null,
    2,
  )

  await bookmarkFile.save(contents)

  const isNew = bookmarkInserted.createdAt === bookmarkInserted.updatedAt

  res.status(httpStatusCode.success200).json({
    message: isNew === true ? 'saved' : 'updated',
    bookmark: bookmarkInserted,
  })
}
