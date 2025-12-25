import { getUserFromRefreshTokenOrJohn } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import { bucket } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const getBucketCorsHandler: RouterHandler = async (req, res, _next) => {
  const userFromRefreshToken = getUserFromRefreshTokenOrJohn({ req })

  if (userFromRefreshToken.roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatusCode.forbidden403).json({ message: 'forbidden' })

    return
  }

  const [metadata] = await bucket.getMetadata()
  console.info(JSON.stringify(metadata, null, 2))
  res.json(metadata.cors)
}
