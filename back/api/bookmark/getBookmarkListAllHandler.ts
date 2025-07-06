import type { Request, Response, NextFunction } from 'express'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { BookmarkModel } from '@back/entities/bookmark'
import { userRole } from '@back/shared/const/userRole'

import { z } from 'zod'
import type { SortModelItem } from '@shared/lib/ag-grid/types/SortModelItem'

export type ItemPick = Pick<
  Item,
  'id' | 'email' | 'name' | 'type' | 'createdAt' | 'updatedAt'
>

export type SearchQuery = {
  startRow: string
  endRow: string
  sortModel: string
  filterModel?: string
}

export type ResBody = {
  bookmarkList: ItemPick[]
  bookmarkListTotalCount: number
  message:
    | ErrorMessageCommon
    | 'no permission to view'
    | 'Found'
    | 'Unhandled error'
}

type RouterHandler = (
  req: Request<unknown, unknown, unknown, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkListAllHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized({ req })

  if (roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatus.forbidden_403).json({
      message: 'no permission to view',
      bookmarkList: [],
      bookmarkListTotalCount: 0,
    })

    return
  }

  // Parse pagination, sort, and filter params from ag-Grid (startRow, endRow, sortModel, filterModel)
  const { startRow = 0, endRow = 100, sortModel, filterModel } = req.query
  console.log('🚀 ~ req.query:', req.query)

  const sortModelSchema = z.array(
    z.object({
      colId: z.string(),
      sort: z.enum(['asc', 'desc']),
    }),
  )

  const {
    success,
    error,
    data: parsedSortModel,
  } = sortModelSchema.safeParse(JSON.parse(sortModel))

  if (success === false) {
    throw new Error('Invalid sortModel format', error)
  }

  const sort = parsedSortModel.reduce<Record<string, 1 | -1>>(
    (accumulator, item) => {
      if (item.sort === 'asc') {
        accumulator[item.colId] = 1
      }

      if (item.sort === 'desc') {
        accumulator[item.colId] = -1
      }

      return accumulator
    },
    {},
  )

  const filter: Record<string, any> = {}

  if (filterModel) {
    try {
      const filterObj = JSON.parse(filterModel)

      // Basic string/text filter support (ag-Grid default)
      Object.entries(filterObj).forEach(([field, filterDef]: [string, any]) => {
        if (filterDef.filter != null) {
          // For text filter, use case-insensitive partial match
          filter[field] = { $regex: filterDef.filter, $options: 'i' }
        }
        // Add more filter types as needed (e.g., date, number)
      })
    } catch {}
  }

  // Query all bookmarks (no user filter)
  const bookmarkListPromise = BookmarkModel.find(filter, {
    _id: 0,
    id: 1,
    name: 1,
    category: 1,
    desc: 1,
    type: 1,
    createdAt: 1,
    updatedAt: 1,
    email: 1,
  })
    .sort(sort)
    .skip(Number(startRow))
    .limit(Number(endRow) - Number(startRow))
    .lean()

  const bookmarkListTotalCountPromise = BookmarkModel.countDocuments(filter)

  const [bookmarkListResponse, bookmarkListTotalCountResponse] =
    await Promise.allSettled([
      bookmarkListPromise,
      bookmarkListTotalCountPromise,
    ])

  const fulfilled =
    bookmarkListResponse.status === 'fulfilled' &&
    bookmarkListTotalCountResponse.status === 'fulfilled'

  if (fulfilled === false) {
    res.status(httpStatus.notFound_404).json({
      message: 'Unhandled error',
      bookmarkList: [],
      bookmarkListTotalCount: 0,
    })

    return
  }

  res.status(httpStatus.success_200).json({
    message: 'Found',
    bookmarkList: bookmarkListResponse.value,
    bookmarkListTotalCount: bookmarkListTotalCountResponse.value, // ag-Grid uses this for infinite scroll
  })
}
