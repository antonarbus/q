import { FileModel } from '@back/entities/file'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'
import { httpStatus } from '@back/shared/const/httpStatus'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  fileId: string
}

export type ResBody = {
  message: 'deleted'
}

export type ErrorResBody = {
  message:
    | ErrorMessageCommon
    | 'failed to delete'
    | 'you did not upload this file'
    | 'not found'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const deleteFileHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })
  const { fileId } = req.body

  type FileOwnerShip = 'file not found' | 'owner' | 'not owner'

  const getFileOwnerShip = async (): Promise<FileOwnerShip> => {
    const fileInfo = await FileModel.findOne({ id: fileId }).lean()

    if (fileInfo === null) {
      return 'file not found'
    }

    if (fileInfo.email !== email) {
      return 'not owner'
    }

    return 'owner'
  }

  const fileOwnerShip = await getFileOwnerShip()

  if (fileOwnerShip === 'file not found') {
    res.status(httpStatus.notFound_404).json({ message: 'not found' })

    return
  }

  if (fileOwnerShip === 'not owner') {
    res
      .status(httpStatus.notFound_404)
      .json({ message: 'you did not upload this file' })

    return
  }

  if (fileOwnerShip === 'owner') {
    const { path } = getFileInfo({ id: fileId })

    try {
      const deleteFromBucketPromise = bucket.file(path).delete()

      const deleteFromDatabasePromise = FileModel.deleteOne({
        id: fileId,
        email,
      })

      await Promise.all([deleteFromBucketPromise, deleteFromDatabasePromise])
    } catch {
      res.status(httpStatus.notFound_404).json({ message: 'failed to delete' })

      return
    }

    res.status(httpStatus.success_200).json({ message: 'deleted' })
  }
}
