import type { Request, Response, NextFunction } from 'express'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { BookmarkModel } from '@back/entities/bookmark'
import { userRole } from '@back/shared/const/userRole'

export type ItemPick = Pick<
  Item,
  'id' | 'email' | 'name' | 'type' | 'createdAt' | 'updatedAt'
>

export type SearchQuery = {
  startRow: number
  endRow: number
}

export type ResBody = {
  message:
    | ErrorMessageCommon
    | 'no permission to view'
    | 'Found'
    | 'Unhandled error'
  bookmarkList: ItemPick[]
  bookmarkListTotalCount: number
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

  // Parse pagination params from ag-Grid (startRow, endRow)
  const { startRow = 0, endRow = 100 } = req.query

  // Query all bookmarks (no user filter)
  const bookmarkListPromise = BookmarkModel.find(
    {},
    {
      _id: 0,
      id: 1,
      name: 1,
      category: 1,
      desc: 1,
      type: 1,
      createdAt: 1,
      updatedAt: 1,
      email: 1,
    },
  )
    .skip(startRow)
    .limit(endRow - startRow)
    .lean()

  const bookmarkListTotalCountPromise = BookmarkModel.countDocuments()

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
