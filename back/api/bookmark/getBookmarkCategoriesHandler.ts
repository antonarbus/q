import { bookmarksTable, type SelectBookmark } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq, ne } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary
type ReqBody = undefined

export type ResBody = {
  distinctCategoryList: SelectBookmark['category'][]
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
) => Promise<HttpResponse<ResBody>>

export const getBookmarkCategoriesHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const bookmarkListSelected = await db
    .selectDistinct({ category: bookmarksTable.category })
    .from(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.email, userFromAccessToken.email),
        ne(bookmarksTable.category, ''),
      ),
    )
    .orderBy(bookmarksTable.category)

  const distinctCategoryList = bookmarkListSelected.map((row) => row.category)

  messageList.push(`Found ${distinctCategoryList.length} distinct categories`)

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      distinctCategoryList,
      message: messageList.join(' | '),
    },
  })
}
