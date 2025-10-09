import { QuotationModel } from '@back/entities/quotation'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import type { Quotation } from '@entities/quotation'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import type { NextFunction, Request, Response } from 'express'

export type ItemPick = Pick<
  Quotation,
  'id' | 'email' | 'name' | 'type' | 'createdAt' | 'updatedAt'
>

export type ReqBody = {
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
  quotationList: ItemPick[]
  quotationListTotalCount: number
  message: 'Found'
}

export type ErrorResBody = {
  quotationList: ItemPick[]
  quotationListTotalCount: number
  message: ErrorMessageCommon | 'no permission to view' | 'Unhandled error'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getQuotationListAllHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })

  if (roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatus.forbidden_403).json({
      message: 'no permission to view',
      quotationList: [],
      quotationListTotalCount: 0,
    })

    return
  }

  const { startRow = 0, endRow = 100, sortModel, filterModel } = req.body

  const sort = sortModel.reduce<Record<string, 1 | -1>>((accumulator, item) => {
    if (item.sort === 'asc') {
      accumulator[item.colId] = 1
    }

    if (item.sort === 'desc') {
      accumulator[item.colId] = -1
    }

    return accumulator
  }, {})

  const filter = Object.entries(filterModel).reduce<
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
    .skip(startRow)
    .limit(endRow - startRow)
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
