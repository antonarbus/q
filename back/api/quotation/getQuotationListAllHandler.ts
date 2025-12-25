import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCodeCommon } from '@back/shared/const/errorCodeCommon'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, asc, count, desc, ilike } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

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
  quotationList: SelectQuotation[]
  quotationListTotalCount: number
  message: 'Found'
}

type ErrorResBody = {
  message: string
  errorCode: ErrorCodeCommon | 'NO_PERMISSION_TO_VIEW' | 'UNHANDLED_ERROR'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationListAllHandler: RouterHandler = async (req, res) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({
    req,
    res,
  })

  if (userFromAccessToken.roles.includes(userRole.superAdmin) === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NO_PERMISSION_TO_VIEW',
      statusCode: httpStatusCode.forbidden403,
      message: 'No permission to view all quotations',
    })
  }

  const sortConditions = req.body.sortModel
    .map((item) => {
      // eslint-disable-next-line
      const column = quotationsTable[item.colId as keyof typeof quotationsTable]

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

  const filterConditions = Object.entries(req.body.filterModel)
    .map(([field, filterDef]) => {
      // eslint-disable-next-line
      const column = quotationsTable[field as keyof typeof quotationsTable]

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
  const baseQuery = db.select().from(quotationsTable)

  const queryWithFilters =
    filterConditions.length > 0
      ? baseQuery.where(and(...filterConditions))
      : baseQuery

  const queryWithSort =
    sortConditions.length > 0
      ? queryWithFilters.orderBy(...sortConditions)
      : queryWithFilters

  const quotationListPromise = queryWithSort
    .offset(req.body.startRow)
    .limit(req.body.endRow - req.body.startRow)

  const baseCountQuery = db.select({ count: count() }).from(quotationsTable)

  const countQueryWithFilters =
    filterConditions.length > 0
      ? baseCountQuery.where(and(...filterConditions))
      : baseCountQuery

  const quotationListTotalCountPromise = countQueryWithFilters.then(
    (result) => result[0]?.count ?? 0,
  )

  const [quotationListResponse, quotationListTotalCountResponse] =
    await Promise.allSettled([
      quotationListPromise,
      quotationListTotalCountPromise,
    ])

  const fulfilled =
    quotationListResponse.status === 'fulfilled' &&
    quotationListTotalCountResponse.status === 'fulfilled'

  if (fulfilled === false) {
    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'UNHANDLED_ERROR',
      statusCode: httpStatusCode.notFound404,
      message: 'Failed to fetch quotation list',
    })
  }

  res.status(httpStatusCode.success200).json({
    message: 'Found',
    quotationList: quotationListResponse.value,
    quotationListTotalCount: quotationListTotalCountResponse.value,
  })
}
