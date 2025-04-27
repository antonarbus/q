import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { FileModel } from '@back/entities/file'

export type ReqBody = {
  id: string
  name: string
  size: number
}

export type ResBody = {
  fileId?: string
  fileName?: string
  fileSize?: number
  uploadedAt?: Date
  message:
    | ErrorMessageCommon
    | 'invalid file id'
    | 'saved file info'
    | 'failed to make file public'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const saveFileInfoHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { id: fileId, name: fileName, size: fileSize } = req.body

  try {
    const createFileDocRes = await FileModel.create({
      id: fileId,
      email,
      name: fileName,
      size: fileSize,
    })

    const fileDocument = createFileDocRes.toObject()

    res.status(httpStatus.success_200).json({
      fileId: fileDocument.id,
      fileName: fileDocument.name,
      fileSize: fileDocument.size,
      uploadedAt: fileDocument.uploadedAt,
      message: 'saved file info',
    })
  } catch {
    res.status(httpStatus.serverError_500).json({
      message: 'failed to make file public',
    })
  }
}
