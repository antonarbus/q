import { bookmarksTable, type SelectBookmark } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { db } from '@back/shared/lib/drizzle/db'
import { userRole } from '@back/shared/const/userRole'
import { and, asc, count, desc, ilike } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import type { ParamsDictionary } from 'express-serve-static-core'

type UrlParam = ParamsDictionary
type ReqBody = undefined

type SearchQuery = {
  startRow: string
  endRow: string
  sortModel: string
  filterModel: string
}

export type ResBody = {
  bookmarkList: SelectBookmark[]
  bookmarkListTotalCount: number
  message: string
}

type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NO_PERMISSION' | 'UNHANDLED_ERROR'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkListAllHandler: RouterHandler = async (req, res) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  if (userFromAccessToken.roles.includes(userRole.superAdmin) === false) {
    messageList.push('No permission to view all bookmarks')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NO_PERMISSION',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Super-admin access granted')

  const sortModelSchema = z.array(
    z.object({
      colId: z.string(),
      sort: z.enum(['asc', 'desc']),
    }),
  )

  // ? maybe it is not a good idea to pass parameters in search query params, coz they are strings
  // ? to type we need to have parse it with schema, dah...
  // ? body params via axios are easier, but this probably more semantic
  // * but it is a good example how to do it

  const sortModelParsed = sortModelSchema.safeParse(
    JSON.parse(req.query.sortModel),
  )

  if (sortModelParsed.success === false) {
    throw new Error('Invalid sortModel format', sortModelParsed.error)
  }

  const sortConditions = sortModelParsed.data
    .map((item) => {
      // eslint-disable-next-line
      const column = bookmarksTable[item.colId as keyof typeof bookmarksTable]

      // Check if it's a valid column (has columnType property)
      const isValidColumn = typeof column === 'object' && 'columnType' in column

      if (isValidColumn === false) {
        return null
      }

      const sortedColumn = item.sort === 'asc' ? asc(column) : desc(column)

      return sortedColumn
    })
    .filter((condition): condition is NonNullable<typeof condition> =>
      Boolean(condition),
    )

  const filterModelSchema = z.record(
    z.string(),
    z.object({
      filterType: z.string(),
      type: z.string(),
      filter: z.string(),
    }),
  )

  const filterModelParsed = filterModelSchema.safeParse(
    JSON.parse(req.query.filterModel),
  )

  if (filterModelParsed.success === false) {
    throw new Error('Invalid filterModel format', filterModelParsed.error)
  }

  const filterConditions = Object.entries(filterModelParsed.data)
    .map(([field, filterDef]) => {
      // eslint-disable-next-line
      const column = bookmarksTable[field as keyof typeof bookmarksTable]

      // Check if it's a valid column (has columnType property)
      const isValidColumn = typeof column === 'object' && 'columnType' in column

      if (isValidColumn === false) {
        return null
      }

      const filterCondition = ilike(column, `%${filterDef.filter}%`)

      return filterCondition
    })
    .filter((condition): condition is NonNullable<typeof condition> =>
      Boolean(condition),
    )

  // Query all bookmarks (no user filter)
  const baseQuery = db.select().from(bookmarksTable)

  const queryWithFilters =
    filterConditions.length > 0
      ? baseQuery.where(and(...filterConditions))
      : baseQuery

  const queryWithSort =
    sortConditions.length > 0
      ? queryWithFilters.orderBy(...sortConditions)
      : queryWithFilters

  const bookmarkListPromise = queryWithSort
    .offset(Number(req.query.startRow))
    .limit(Number(req.query.endRow) - Number(req.query.startRow))

  const baseCountQuery = db.select({ count: count() }).from(bookmarksTable)

  const countQueryWithFilters =
    filterConditions.length > 0
      ? baseCountQuery.where(and(...filterConditions))
      : baseCountQuery

  const bookmarkListTotalCountPromise = countQueryWithFilters.then(
    (result) => result[0]?.count ?? 0,
  )

  const [bookmarkListResponse, bookmarkListTotalCountResponse] =
    await Promise.allSettled([
      bookmarkListPromise,
      bookmarkListTotalCountPromise,
    ])

  const fulfilled =
    bookmarkListResponse.status === 'fulfilled' &&
    bookmarkListTotalCountResponse.status === 'fulfilled'

  if (fulfilled === false) {
    messageList.push('Failed to fetch bookmarks from database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'UNHANDLED_ERROR',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  }

  messageList.push(
    `Found ${bookmarkListTotalCountResponse.value} total bookmarks`,
  )

  messageList.push(
    `Returned ${bookmarkListResponse.value.length} bookmarks for current page`,
  )

  res.status(httpStatusCode.success200).json({
    bookmarkList: bookmarkListResponse.value,
    bookmarkListTotalCount: bookmarkListTotalCountResponse.value,
    message: messageList.join(' | '),
  })
}
