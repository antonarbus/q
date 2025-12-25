import { getUserFromRefreshTokenOrJohn } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import { bucket } from '@back/shared/lib/google-cloud-storage'
import type { NextFunction, Request, Response } from 'express'
import { secret } from '@root/config/secrets'
import { DOMAIN } from '@root/config/infrastructure'

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const setBucketCorsHandler: RouterHandler = async (req, res, _next) => {
  const userFromRefreshToken = getUserFromRefreshTokenOrJohn({ req })

  if (userFromRefreshToken.roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatusCode.forbidden403).json({ message: 'forbidden' })
  }

  const corsUpdateRes = await bucket.setCorsConfiguration([
    {
      origin: [
        `https://${DOMAIN}`,
        `http://${DOMAIN}`,
        `https://*.${DOMAIN}`,
        `http://*.${DOMAIN}`,
        `http://local.${DOMAIN}:3000`, // pdf download does not work without port
        `https://local.${DOMAIN}:3000`, // pdf download does not work without port
        'http://localhost:3000', // pdf download does not work without port
        'https://localhost:3000', // pdf download does not work without port
        '*', // pdf download does not work without port
      ],
      method: ['PUT', 'POST', 'GET'],
      maxAgeSeconds: 3600,
      responseHeader: ['Content-Type', 'x-goog-content-length-range'],
    },
  ])

  console.info(`Bucket ${secret.BUCKET_NAME} CORS were updated`)

  res.json(corsUpdateRes.at(0)?.cors)
}
