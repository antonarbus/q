import { type SelectBookmark, bookmarksTable } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = unknown

export type ResBody = {
  bookmarkList: SelectBookmark[]
  message: 'Found' | 'No content'
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon
}

type RouterHandler = (
  req: Request<UrlParam, unknown, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkListHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const bookmarkListSelected = await db
    .select()
    .from(bookmarksTable)
    .where(eq(bookmarksTable.email, userFromAccessToken.email))

  const message = bookmarkListSelected.length === 0 ? 'No content' : 'Found'

  res
    .status(httpStatusCode.success200)
    .json({ message, bookmarkList: bookmarkListSelected })
}
