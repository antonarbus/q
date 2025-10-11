import { FileModel } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import type { File } from '@entities/file/type'
import type { NextFunction, Request, Response } from 'express'

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

export const getFileListHandler: RouterHandler = async (req, res, _next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })

  const fileList = await FileModel.find({ email })
    .select({ _id: 0, id: 1, name: 1, size: 1 })
    .lean()

  res.status(httpStatus.success_200).json({ message: 'file stats', fileList })
}
