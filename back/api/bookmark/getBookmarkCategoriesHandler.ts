import { bookmarksTable, type SelectBookmark } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { and, eq, ne } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  distinctCategoryList: SelectBookmark['category'][]
  message: 'Found'
}

export type ErrorResBody = {
  message: ErrorMessageCommon
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkCategoriesHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  const bookmarkListWithDistinctCategories = await db
    .selectDistinct({ category: bookmarksTable.category })
    .from(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.email, userFromAccessToken.email),
        ne(bookmarksTable.category, ''),
      ),
    )
    .orderBy(bookmarksTable.category)

  const distinctCategoryList = bookmarkListWithDistinctCategories.map(
    (row) => row.category,
  )

  res
    .status(httpStatus.success200)
    .json({ message: 'Found', distinctCategoryList })
}
