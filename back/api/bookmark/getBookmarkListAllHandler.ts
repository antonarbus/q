import { bookmarksTable, type SelectBookmark } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { userRole } from '@back/shared/const/userRole'
import { and, asc, count, desc, ilike } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

type SearchQuery = {
  startRow: string
  endRow: string
  sortModel: string
  filterModel: string
}

export type ResBody = {
  bookmarkList: SelectBookmark[]
  bookmarkListTotalCount: number
  message: 'Found'
}

type ErrorResBody = {
  bookmarkList: SelectBookmark[]
  bookmarkListTotalCount: number
  message: ErrorMessageCommon | 'no permission to view' | 'Unhandled error'
}

type RouterHandler = (
  req: Request<unknown, unknown, unknown, SearchQuery>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkListAllHandler: RouterHandler = async (
  req,
  res,
  _next,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  if (userFromAccessToken.roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatus.forbidden403).json({
      message: 'no permission to view',
      bookmarkList: [],
      bookmarkListTotalCount: 0,
    })

    return
  }

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
    res.status(httpStatus.notFound404).json({
      message: 'Unhandled error',
      bookmarkList: [],
      bookmarkListTotalCount: 0,
    })

    return
  }

  res.status(httpStatus.success200).json({
    message: 'Found',
    bookmarkList: bookmarkListResponse.value,
    bookmarkListTotalCount: bookmarkListTotalCountResponse.value,
  })
}
