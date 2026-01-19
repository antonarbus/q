import {
  filesTable,
  type SelectFile,
} from '@back/entity/file/db/filesTableSchema'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { db } from '@back/shared/lib/drizzle/db'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'
import { and, asc, count, desc, ilike } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
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
  fileList: SelectFile[]
  fileListTotalCount: number
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

export const getFileListAllHandler: RouterHandler = async (req, res, next) => {
  const userFromAccessToken = await getUserFromAccessTokenOrThrowUnauthorized({
    req,
  })

  const messageList: string[] = []

  if (userFromAccessToken.roles.includes('super-admin') === false) {
    messageList.push('No permission to view all files')

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

  const sortModelParsed = sortModelSchema.safeParse(
    JSON.parse(req.query.sortModel),
  )

  if (sortModelParsed.success === false) {
    throw new Error('Invalid sortModel format', sortModelParsed.error)
  }

  const sortConditions = sortModelParsed.data
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
    .offset(Number(req.query.startRow))
    .limit(Number(req.query.endRow) - Number(req.query.startRow))

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
    messageList.push('Failed to fetch files from database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'UNHANDLED_ERROR',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  messageList.push(`Found ${fileListTotalCountResponse.value} total files`)

  messageList.push(
    `Returned ${fileListResponse.value.length} files for current page`,
  )

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      fileList: fileListResponse.value,
      fileListTotalCount: fileListTotalCountResponse.value,
      message: messageList.join(' | '),
    },
  })
}
