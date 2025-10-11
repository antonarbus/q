import { FileModel } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import type { NextFunction, Request, Response } from 'express'

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
  message: 'saved file info'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'invalid file id' | 'failed to make file public'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const saveFileInfoHandler: RouterHandler = async (req, res, _next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
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
