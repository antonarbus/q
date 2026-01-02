import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { and, asc, count, desc, ilike } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import {
  type HttpResponse,
  httpResponse,
} from '@back/shared/lib/express/httpResponse'

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
  message: string
}

type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'NO_PERMISSION_TO_VIEW' | 'UNHANDLED_ERROR'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getQuotationListAllHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const userFromAccessToken = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  if (userFromAccessToken.roles.includes(userRole.superAdmin) === false) {
    messageList.push('No permission to view all quotations')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'NO_PERMISSION_TO_VIEW',
      statusCode: httpStatusCode.forbidden403,
      message: messageList.join(' | '),
    })
  }

  messageList.push('Super-admin access granted')

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
    messageList.push('Failed to fetch quotations from database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'UNHANDLED_ERROR',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  messageList.push(
    `Found ${quotationListTotalCountResponse.value} total quotations`,
  )

  messageList.push(
    `Returned ${quotationListResponse.value.length} quotations for current page`,
  )

  return httpResponse({
    statusCode: httpStatusCode.success200,
    body: {
      quotationList: quotationListResponse.value,
      quotationListTotalCount: quotationListTotalCountResponse.value,
      message: messageList.join(' | '),
    },
  })
}
