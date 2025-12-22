import { BookmarkModel } from '@back/entities/bookmark'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import type { Item } from '@entities/quotation/type'
import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export type ItemPick = Pick<
  Item,
  'id' | 'email' | 'name' | 'type' | 'createdAt' | 'updatedAt'
>

type SearchQuery = {
  startRow: string
  endRow: string
  sortModel: string
  filterModel: string
}

export type ResBody = {
  bookmarkList: ItemPick[]
  bookmarkListTotalCount: number
  message: 'Found'
}

type ErrorResBody = {
  bookmarkList: ItemPick[]
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

  const sort = sortModelParsed.data.reduce<Record<string, 1 | -1>>(
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

  const filter = Object.entries(filterModelParsed.data).reduce<
    Record<string, { $regex: string; $options: 'i' }>
  >((accumulator, item) => {
    const [field, filterDef] = item
    accumulator[field] = { $regex: filterDef.filter, $options: 'i' }

    return accumulator
  }, {})

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
    .skip(Number(req.query.startRow))
    .limit(Number(req.query.endRow) - Number(req.query.startRow))
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
