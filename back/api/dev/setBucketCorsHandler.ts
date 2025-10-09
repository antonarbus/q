import { getUserFromRefreshTokenOrJohn } from '@back/entities/user'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import { getEnvVarOrThrow } from '@back/shared/lib/dot-env'
import { bucket } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const setBucketCorsHandler: RouterHandler = async (req, res, _next) => {
  const { roles } = getUserFromRefreshTokenOrJohn({ req })

  if (roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatus.forbidden_403).json({ message: 'forbidden' })
  }

  const corsUpdateRes = await bucket.setCorsConfiguration([
    {
      origin: [
        'https://sendmequotation.today',
        'http://sendmequotation.today',
        'https://*.sendmequotation.today',
        'http://*.sendmequotation.today',
        'http://local.sendmequotation.today:3000', // pdf download does not work without port
        'https://local.sendmequotation.today:3000', // pdf download does not work without port
        'http://localhost:3000', // pdf download does not work without port
        'https://localhost:3000', // pdf download does not work without port
        '*', // pdf download does not work without port
      ],
      method: ['PUT', 'POST', 'GET'],
      maxAgeSeconds: 3600,
      responseHeader: ['Content-Type', 'x-goog-content-length-range'],
    },
  ])

  console.info(`Bucket ${getEnvVarOrThrow('BUCKET_NAME')} CORS were updated`)

  res.json(corsUpdateRes.at(0)?.cors)
}
