import type { Request, Response, NextFunction } from 'express'
import type { Item } from '@entities/bookmark'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
// import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { BookmarkModel } from '@back/entities/bookmark'

export type ItemPick = Pick<
  Item,
  'id' | 'name' | 'category' | 'desc' | 'type' | 'createdAt' | 'updatedAt'
>

export type SearchQuery = {
  startRow: number
  endRow: number
}

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'No content' | 'Unhandled error'
  bookmarkList: ItemPick[]
  bookmarkListTotalCount: number
}

type RouterHandler = (
  req: Request<unknown, unknown, unknown, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

// todo: remove this route if not in use
export const getBookmarkListAllHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  try {
    // Parse pagination params from ag-Grid (startRow, endRow)
    const { startRow = 0, endRow = 100 } = req.query
    const limit = endRow - startRow
    const skip = startRow

    // Query all bookmarks (no user filter)
    const [bookmarkList, bookmarkListTotalCount] = await Promise.all([
      BookmarkModel.find(
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
        .skip(skip)
        .limit(limit)
        .lean(),
      BookmarkModel.countDocuments({}),
    ])

    // ag-Grid expects bookmarks and totalCount
    res.status(httpStatus.success_200).json({
      message: bookmarkList.length === 0 ? 'No content' : 'Found',
      bookmarkList,
      bookmarkListTotalCount, // ag-Grid can use this for infinite scroll
    })
  } catch {
    res.status(httpStatus.notFound_404).json({
      message: 'Unhandled error',
      bookmarkList: [],
      bookmarkListTotalCount: 0,
    })
  }
}
