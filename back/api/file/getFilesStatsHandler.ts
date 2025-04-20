import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { bucket, getFolderPath } from '@back/shared/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'

export type ResBody = {
  message: ErrorMessageCommon | 'file stats' | 'no item in bucket' | 'deleted'
  fileStats: {
    fileCount: number
    totalSize: number
  }
  filesInfo: {
    fileName: string
    fileSize: number
    fileUpdatedAt: string | undefined
  }[]
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getFilesStatsHandler: RouterHandler = async (req, res, next) => {
  const { email } = getUserFromAccessTokenOrThrowUnauthorized({ req })
  const folderPath = getFolderPath({ email, fileType: 'file' })
  const [files] = await bucket.getFiles({ prefix: folderPath })

  const fileStats = files.reduce(
    (acc, file) => {
      acc.fileCount++
      acc.totalSize += Number(file.metadata.size)

      return acc
    },
    { fileCount: 0, totalSize: 0 },
  )

  const filesInfo = files.map((file) => ({
    fileName: file.name.replace(folderPath, ''),
    fileSize: Number(file.metadata.size ?? 0),
    fileUpdatedAt: file.metadata.updated,
  }))

  res
    .status(httpStatus.success_200)
    .json({ message: 'file stats', fileStats, filesInfo })
}
