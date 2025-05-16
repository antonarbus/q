import type { Request, Response, NextFunction } from 'express'
import { bucket } from '@back/shared/services/storage'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { userRole } from '@back/shared/consts/userRole'
import { getUserFromRefreshTokenOrJohn } from '@back/entities/user'

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
