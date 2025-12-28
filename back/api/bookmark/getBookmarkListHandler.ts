import { type SelectBookmark, bookmarksTable } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  bookmarkList: SelectBookmark[]
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkListHandler: RouterHandler = async (req, res) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const bookmarkListSelected = await db
    .select()
    .from(bookmarksTable)
    .where(eq(bookmarksTable.email, userFromAccessToken.email))

  messageList.push(`Found ${bookmarkListSelected.length} bookmarks`)

  res.status(httpStatusCode.success200).json({
    bookmarkList: bookmarkListSelected,
    message: messageList.join(' | '),
  })
}
