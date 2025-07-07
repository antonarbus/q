import type { Request, Response, NextFunction } from 'express'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { userRole } from '@back/shared/const/userRole'
import { z } from 'zod'
import { QuotationModel } from '@back/entities/quotation'

export type ItemPick = Pick<
  Quotation,
  'id' | 'email' | 'name' | 'type' | 'createdAt' | 'updatedAt'
>

export type SearchQuery = {
  startRow: string
  endRow: string
  sortModel: string
  filterModel: string
}

export type ResBody = {
  quotationList: ItemPick[]
  quotationListTotalCount: number
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

export const getQuotationListAllHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized({ req })

  if (roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatus.forbidden_403).json({
      message: 'no permission to view',
      quotationList: [],
      quotationListTotalCount: 0,
    })

    return
  }

  const { startRow = 0, endRow = 100, sortModel, filterModel } = req.query

  const sortModelSchema = z.array(
    z.object({
      colId: z.string(),
      sort: z.enum(['asc', 'desc']),
    }),
  )

  // ? maybe it is not a good idea to pass parameters in search query params, coz they are strings
  // ? to type we need to have parse it with schema, dah...
  // but it is a good example how to do it
  const {
    success: parseSortModelSuccess,
    error: parseSortModelError,
    data: parsedSortModel,
  } = sortModelSchema.safeParse(JSON.parse(sortModel))

  if (parseSortModelSuccess === false) {
    throw new Error('Invalid sortModel format', parseSortModelError)
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

  const filterModelSchema = z.record(
    z.string(),
    z.object({
      filterType: z.string(),
      type: z.string(),
      filter: z.string(),
    }),
  )

  const {
    success: parseFilterModelSuccess,
    error: parseFilterModelError,
    data: parsedFilterModel,
  } = filterModelSchema.safeParse(JSON.parse(filterModel))

  if (parseFilterModelSuccess === false) {
    throw new Error('Invalid filterModel format', parseFilterModelError)
  }

  const filter = Object.entries(parsedFilterModel).reduce<
    Record<string, { ['$regex']: string; ['$options']: 'i' }>
  >((accumulator, item) => {
    const [field, filterDef] = item
    accumulator[field] = { $regex: filterDef.filter, $options: 'i' }

    return accumulator
  }, {})

  // Query all bookmarks (no user filter)
  const quotationListPromise = QuotationModel.find(filter, {
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

  const quotationListTotalCountPromise = QuotationModel.countDocuments(filter)

  const [quotationListResponse, quotationListTotalCountResponse] =
    await Promise.allSettled([
      quotationListPromise,
      quotationListTotalCountPromise,
    ])

  const fulfilled =
    quotationListResponse.status === 'fulfilled' &&
    quotationListTotalCountResponse.status === 'fulfilled'

  if (fulfilled === false) {
    res.status(httpStatus.notFound_404).json({
      message: 'Unhandled error',
      quotationList: [],
      quotationListTotalCount: 0,
    })

    return
  }

  res.status(httpStatus.success_200).json({
    message: 'Found',
    quotationList: quotationListResponse.value,
    quotationListTotalCount: quotationListTotalCountResponse.value,
  })
}
