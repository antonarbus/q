import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, fileBaseUrl, getFilePath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { FileModel } from '@back/entities/file'

export type ReqBody = {
  id: string
  name: string
  size: number
}

export type ResBody = {
  link?: string
  fileId?: string
  fileName?: string
  fileSize?: number
  uploadedAt?: Date
  message:
    | ErrorMessageCommon
    | 'invalid file id'
    | 'made file public'
    | 'failed to make file public'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const fileAfterUploadHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { id: fileId, name: fileName, size: fileSize } = req.body

  try {
    const filePath = getFilePath({ fileType: 'file', fileId })
    await bucket.file(filePath).makePublic()
    const publicUrl = `${fileBaseUrl}/${filePath}`

    const createFileDocRes = await FileModel.create({
      id: fileId,
      email,
      name: fileName,
      size: fileSize,
    })

    const fileDocument = createFileDocRes.toObject()

    res.status(httpStatus.success_200).json({
      message: 'made file public',
      link: publicUrl,
      fileId: fileDocument.id,
      fileName: fileDocument.name,
      fileSize: fileDocument.size,
      uploadedAt: fileDocument.uploadedAt,
    })
  } catch {
    res.status(httpStatus.serverError_500).json({
      message: 'failed to make file public',
    })
  }
}
