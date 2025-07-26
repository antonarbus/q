import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { File } from '@entities/file'
import { FileModel } from '@back/entities/file'

export type ResBody = {
  fileList: {
    id: File['id']
    name: File['name']
    size: File['size']
  }[]
  message: 'file stats'
}

export type ErrorResBody = {
  message: ErrorMessageCommon
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getFileListHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })

  const fileList = await FileModel.find({ email })
    .select({ _id: 0, id: 1, name: 1, size: 1 })
    .lean()

  res.status(httpStatus.success_200).json({ message: 'file stats', fileList })
}
