import { Router, type Request, type Response, type NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { bucket, storageFolderName } from '../../services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '../../utils/jwt'

export type ResBody = {
  message: ErrorMessageCommon | 'file stats' | 'no item in bucket' | 'deleted'
  fileStats: {
    fileCount: number
    totalSize: number
  }
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getFilesStatsRouter = Router()

const getFilesStats: RouterHandler = async (req, res, next) => {
  try {
    const { email } = getUserFromAccessTokenOrThrowUnauthorized(req)

    const [files] = await bucket.getFiles({
      prefix: `${email}/${storageFolderName.files}/`,
    })

    const fileStats = files.reduce(
      (acc, file) => {
        acc.fileCount++
        acc.totalSize += Number(file.metadata.size)

        return acc
      },
      { fileCount: 0, totalSize: 0 },
    )

    res
      .status(httpStatus.success_200)
      .json({ message: 'file stats', fileStats })
  } catch (error) {
    next(error)
  }
}

getFilesStatsRouter.get('/', getFilesStats)
