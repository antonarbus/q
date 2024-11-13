import { Router } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '../../consts/httpStatus'
import { verifyAccessTokenMiddleware } from '../../middleware/verifyAccessTokenMiddleware'
import { bucket, storageFolderName } from '../../services/storage'
import type { ResWithBody, ReqWithBody, Next } from '../../types'
import { getUserFromRefreshTokenOrThrowUnauthorized } from '../../utils/getUserFromRefreshTokenOrThrowUnauthorized'

export type ResBody = {
  message: ErrorMessageCommon | 'file stats' | 'no item in bucket' | 'deleted'
  fileStats: {
    fileCount: number
    totalSize: number
  }
}

type RouterHandler = (
  req: ReqWithBody,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const getFilesStatsRouter = Router()

const getFilesStats: RouterHandler = async (req, res, next) => {
  try {
    const { email } = getUserFromRefreshTokenOrThrowUnauthorized(req)

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

    return res
      .status(httpStatus.success_200)
      .json({ message: 'file stats', fileStats })
  } catch (error) {
    next(error)
  }
}

getFilesStatsRouter.get(
  '/',
  (req, res, next) => {
    verifyAccessTokenMiddleware(req, res, next)
  },
  (req, res, next) => {
    void getFilesStats(req, res, next)
  },
)
