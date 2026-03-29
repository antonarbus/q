// oxlint-disable unicorn/prefer-native-coercion-functions
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { NextFunction, Request, Response } from 'express'
import {
  quotationsTable,
  type SelectQuotation,
} from '@back/entity/quotation/db/quotationsTableSchema'
import { db } from '@back/shared/lib/drizzle/db'
import { and, asc, count, desc, ilike } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import { type HttpResponse, httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import { z } from 'zod'

type UrlParam = ParamsDictionary
type ReqBody = undefined

type SearchQuery = {
  startRow: string
  endRow: string
  sortModel: string
  filterModel: string
}

export type ResBody = {
  quotationList: SelectQuotation[]
  quotationListTotalCount: number
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
) => Promise<HttpResponse<ResBody>>

export const getQuotationListAllHandler: RouterHandler = async (req) => {
  const userFromAccessToken = await getUserFromAccessTokenOrThrowUnauthorized({
    req,
  })

  const messageList: string[] = []

  if (userFromAccessToken.roles.includes('super-admin') === false) {
    messageList.push('No permission to view all quotations')

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

  const sortModelParsed = sortModelSchema.safeParse(JSON.parse(req.query.sortModel))

  if (sortModelParsed.success === false) {
    throw new Error('Invalid sortModel format', sortModelParsed.error)
  }

  const sortConditions = sortModelParsed.data
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
    .filter((condition): condition is NonNullable<typeof condition> => Boolean(condition))

  const filterModelSchema = z.record(
    z.string(),
    z.object({
      filterType: z.string(),
      type: z.string(),
      filter: z.string(),
    }),
  )

  const filterModelParsed = filterModelSchema.safeParse(JSON.parse(req.query.filterModel))

  if (filterModelParsed.success === false) {
    throw new Error('Invalid filterModel format', filterModelParsed.error)
  }

  const filterConditions = Object.entries(filterModelParsed.data)
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
    .filter((condition): condition is NonNullable<typeof condition> => Boolean(condition))

  // Query all files (no user filter)
  const baseQuery = db.select().from(quotationsTable)

  const queryWithFilters =
    filterConditions.length > 0 ? baseQuery.where(and(...filterConditions)) : baseQuery

  const queryWithSort =
    sortConditions.length > 0 ? queryWithFilters.orderBy(...sortConditions) : queryWithFilters

  const quotationListPromise = queryWithSort
    .offset(Number(req.query.startRow))
    .limit(Number(req.query.endRow) - Number(req.query.startRow))

  const baseCountQuery = db.select({ count: count() }).from(quotationsTable)

  const countQueryWithFilters =
    filterConditions.length > 0 ? baseCountQuery.where(and(...filterConditions)) : baseCountQuery

  const quotationListTotalCountPromise = countQueryWithFilters.then(
    (result) => result[0]?.count ?? 0,
  )

  const [quotationListResponse, quotationListTotalCountResponse] = await Promise.allSettled([
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

  messageList.push(`Found ${quotationListTotalCountResponse.value} total quotations`)

  messageList.push(`Returned ${quotationListResponse.value.length} quotations for current page`)

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      quotationList: quotationListResponse.value,
      quotationListTotalCount: quotationListTotalCountResponse.value,
      message: messageList.join(' | '),
    },
  })
}
