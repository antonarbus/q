import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFilePath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { QuotationModel } from '@back/entities/quotation'

export type ReqBody = {
  fileName: string
}

export type ResBody = {
  deletedFileName: string
  quotationsModifiedCount: number
  filesDeleted: number
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
  const { fileName } = req.body

  if (!fileName || typeof fileName !== 'string') {
    res.status(httpStatus.badRequest_400).json({
      message: 'invalid file name',
      deletedFileName: '',
      filesDeleted: 0,
      quotationsModifiedCount: 0,
    })

    return
  }

  try {
    const deleteFileFromQuotationResponse = await QuotationModel.updateMany(
      { email, 'files.fileName': fileName },
      { $pull: { files: { fileName } } },
    )

    const quotationsModifiedCount =
      deleteFileFromQuotationResponse.modifiedCount

    const filePath = getFilePath({ email, fileType: 'file', fileName })

    const deleteFileFromBucketResponse = await bucket.file(filePath).delete()

    const filesDeleted = deleteFileFromBucketResponse.filter(
      (item) => item.statusCode === 204,
    ).length

    res.status(httpStatus.success_200).json({
      message: 'deleted',
      deletedFileName: fileName,
      quotationsModifiedCount,
      filesDeleted,
    })
  } catch {
    res.status(httpStatus.notFound_404).json({
      message: 'failed to delete',
      deletedFileName: '',
      quotationsModifiedCount: 0,
      filesDeleted: 0,
    })
  }
}
