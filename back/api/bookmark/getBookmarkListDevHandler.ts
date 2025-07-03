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

export type ResBody = {
  message: ErrorMessageCommon | 'Found' | 'No content' | 'Unhandled error'
  bookmarks: ItemPick[]
  totalCount?: number
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getBookmarkListDevHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  try {
    // Parse pagination params from ag-Grid (startRow, endRow)
    const startRowRaw = req.query.startRow
    const endRowRaw = req.query.endRow
    let startRow = 0
    let endRow = 100

    if (typeof startRowRaw === 'string') {
      const parsed = parseInt(startRowRaw)
      startRow = parsed
    }

    if (typeof endRowRaw === 'string') {
      const parsed = parseInt(endRowRaw)
      endRow = parsed
    }

    const limit = endRow - startRow
    const skip = startRow

    // Query all bookmarks (no user filter)
    const [bookmarks, totalCount] = await Promise.all([
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
      message: bookmarks.length === 0 ? 'No content' : 'Found',
      bookmarks,
      totalCount, // ag-Grid can use this for infinite scroll
    })
  } catch {
    res.status(httpStatus.notFound_404).json({
      message: 'Unhandled error',
      bookmarks: [],
      totalCount: 0,
    })
  }
}
