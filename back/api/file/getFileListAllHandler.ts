import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { userRole } from '@back/shared/const/userRole'
import type { File } from '@entities/file'
import { FileModel } from '@back/entities/file'

export type Item = {
  id: File['id']
  name: File['name']
  size: File['size']
  email: File['email']
  uploadedAt: File['uploadedAt']
  usedByIdList: File['usedByIdList']
}

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
  fileList: Item[]
  fileListTotalCount: number
  message:
    | ErrorMessageCommon
    | 'no permission to view'
    | 'Found'
    | 'Unhandled error'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getFileListAllHandler: RouterHandler = async (req, res, next) => {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized({ req })

  if (roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatus.forbidden_403).json({
      message: 'no permission to view',
      fileList: [],
      fileListTotalCount: 0,
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
  const fileListPromise = FileModel.find(filter)
    .select({
      _id: 0,
      id: 1,
      name: 1,
      size: 1,
      email: 1,
      usedByIdList: 1,
      uploadedAt: 1,
    })
    .sort(sort)
    .skip(startRow)
    .limit(endRow - startRow)
    .lean()

  const fileListTotalCountPromise = FileModel.countDocuments(filter)

  const [fileListResponse, fileListTotalCountResponse] =
    await Promise.allSettled([fileListPromise, fileListTotalCountPromise])

  const fulfilled =
    fileListResponse.status === 'fulfilled' &&
    fileListTotalCountResponse.status === 'fulfilled'

  if (fulfilled === false) {
    res.status(httpStatus.notFound_404).json({
      message: 'Unhandled error',
      fileList: [],
      fileListTotalCount: 0,
    })

    return
  }

  res.status(httpStatus.success_200).json({
    message: 'Found',
    fileList: fileListResponse.value,
    fileListTotalCount: fileListTotalCountResponse.value,
  })
}
