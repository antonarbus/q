import { getUserFromRefreshTokenOrJohn } from '@back/entities/user'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import { bucket } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const getBucketCorsHandler: RouterHandler = async (req, res, next) => {
  const { roles } = getUserFromRefreshTokenOrJohn({ req })

  if (roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatus.forbidden_403).json({ message: 'forbidden' })

    return
  }

  const [metadata] = await bucket.getMetadata()
  console.info(JSON.stringify(metadata, null, 2))
  res.json(metadata.cors)
}
