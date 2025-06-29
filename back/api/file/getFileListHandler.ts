import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { File } from '@entities/file'
import { FileModel } from '@back/entities/file'

export type ResBody = {
  message: ErrorMessageCommon | 'file stats' | 'no item in bucket' | 'deleted'
  fileList: {
    id: File['id']
    name: File['name']
    size: File['size']
  }[]
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getFileListHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })

  const fileList = await FileModel.find({ email })
    .select({ _id: 0, id: 1, name: 1, size: 1 })
    .lean()

  res.status(httpStatus.success_200).json({ message: 'file stats', fileList })
}
