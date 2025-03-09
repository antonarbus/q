import { Router, type Request, type Response, type NextFunction } from 'express'
import { bucket } from '@back/services/storage'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/utils/headers'
import { httpStatus } from '@back/consts/httpStatus'
import { userRole } from '@back/consts/userRole'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const getBucketCors = Router()

const getBucketMetadata: RouterHandler = async (req, res, next) => {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized(req)

  if (!roles.includes(userRole.superAdmin)) {
    res.status(httpStatus.forbidden_403).json({ message: 'forbidden' })

    return
  }

  const [metadata] = await bucket.getMetadata()
  console.info(JSON.stringify(metadata, null, 2))
  res.json(metadata.cors)
}

getBucketCors.get('/', getBucketMetadata)
