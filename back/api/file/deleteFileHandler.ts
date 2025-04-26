import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFilePath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'

export type ReqBody = {
  fileId: string
}

export type ResBody = {
  deletedFileId: string
  deletedFilesCount: number
  quotationsModifiedCount: number
  message:
    | ErrorMessageCommon
    | 'deleted'
    | 'failed to delete'
    | 'invalid file name'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteFileHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const { fileId } = req.body

  if (!fileId) {
    res.status(httpStatus.badRequest_400).json({
      message: 'invalid file name',
      deletedFileId: '',
      deletedFilesCount: 0,
      quotationsModifiedCount: 0,
    })

    return
  }

  try {
    const deleteFileFromQuotationResponse = await QuotationModel.updateMany(
      { email, 'files.fileId': fileId },
      { $pull: { files: { fileId } } },
    )

    const quotationsModifiedCount =
      deleteFileFromQuotationResponse.modifiedCount

    const filePath = getFilePath({ fileType: 'file', fileId })

    const deleteFileFromBucketResponse = await bucket.file(filePath).delete()

    const filesDeleted = deleteFileFromBucketResponse.filter(
      (item) => item.statusCode === 204,
    ).length

    res.status(httpStatus.success_200).json({
      message: 'deleted',
      deletedFileId: fileId,
      quotationsModifiedCount,
      deletedFilesCount: filesDeleted,
    })
  } catch {
    res.status(httpStatus.notFound_404).json({
      message: 'failed to delete',
      deletedFileId: '',
      quotationsModifiedCount: 0,
      deletedFilesCount: 0,
    })
  }
}
