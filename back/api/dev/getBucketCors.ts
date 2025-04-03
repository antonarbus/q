import { Router, type Request, type Response, type NextFunction } from 'express'
import { bucket } from '@back/shared/services/storage'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { userRole } from '@back/shared/consts/userRole'
import { getUserFromRefreshToken } from '@back/entities/user'
import { asyncHandler } from '@back/shared/utils/asyncHandler'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const getBucketCors = Router()

const getBucketMetadata: RouterHandler = async (req, res, next) => {
  const { roles } = getUserFromRefreshToken({ req })

  if (!roles.includes(userRole.superAdmin)) {
    res.status(httpStatus.forbidden_403).json({ message: 'forbidden' })

    return
  }

  const [metadata] = await bucket.getMetadata()
  console.info(JSON.stringify(metadata, null, 2))
  res.json(metadata.cors)
}

getBucketCors.get('/', asyncHandler(getBucketMetadata))
