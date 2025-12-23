import { filesTable, type SelectFile } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { db } from '@back/shared/lib/drizzle/db'
import { userRole } from '@back/shared/const/userRole'
import { and, asc, count, desc, ilike } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'

type ReqBody = {
  startRow: number
  endRow: number
  sortModel: {
    colId: string
    sort: 'asc' | 'desc'
  }[]
  filterModel: Record<
    string,
    {
      filterType: string
      type: string
      filter: string
    }
  >
}

export type ResBody = {
  fileList: SelectFile[]
  fileListTotalCount: number
  message: 'Found'
}

type ErrorResBody = {
  fileList: SelectFile[]
  fileListTotalCount: number
  message: ErrorMessageCommon | 'no permission to view' | 'Unhandled error'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getFileListAllHandler: RouterHandler = async (req, res, _next) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  if (userFromAccessToken.roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatus.forbidden403).json({
      message: 'no permission to view',
      fileList: [],
      fileListTotalCount: 0,
    })

    return
  }

  const { startRow = 0, endRow = 100, sortModel, filterModel } = req.body

  const sortConditions = sortModel
    .map((item) => {
      // eslint-disable-next-line
      const column = filesTable[item.colId as keyof typeof filesTable]

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

  const filterConditions = Object.entries(filterModel)
    .map(([field, filterDef]) => {
      // eslint-disable-next-line
      const column = filesTable[field as keyof typeof filesTable]

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

  // Query all files (no user filter)
  const baseQuery = db.select().from(filesTable)

  const queryWithFilters =
    filterConditions.length > 0
      ? baseQuery.where(and(...filterConditions))
      : baseQuery

  const queryWithSort =
    sortConditions.length > 0
      ? queryWithFilters.orderBy(...sortConditions)
      : queryWithFilters

  const fileListPromise = queryWithSort
    .offset(startRow)
    .limit(endRow - startRow)

  const baseCountQuery = db.select({ count: count() }).from(filesTable)

  const countQueryWithFilters =
    filterConditions.length > 0
      ? baseCountQuery.where(and(...filterConditions))
      : baseCountQuery

  const fileListTotalCountPromise = countQueryWithFilters.then(
    (result) => result[0]?.count ?? 0,
  )

  const [fileListResponse, fileListTotalCountResponse] =
    await Promise.allSettled([fileListPromise, fileListTotalCountPromise])

  const fulfilled =
    fileListResponse.status === 'fulfilled' &&
    fileListTotalCountResponse.status === 'fulfilled'

  if (fulfilled === false) {
    res.status(httpStatus.notFound404).json({
      message: 'Unhandled error',
      fileList: [],
      fileListTotalCount: 0,
    })

    return
  }

  res.status(httpStatus.success200).json({
    message: 'Found',
    fileList: fileListResponse.value,
    fileListTotalCount: fileListTotalCountResponse.value,
  })
}
