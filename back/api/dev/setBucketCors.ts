import { Router, type Request, type Response, type NextFunction } from 'express'
import { bucket } from '@back/services/storage'
import { getEnvVarOrThrow } from '@back/utils/getEnvVar'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/utils/headers'
import { httpStatus } from '@back/consts/httpStatus'
import { userRole } from '@back/consts/userRole'

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const setBucketCors = Router()

const configureBucketCors: RouterHandler = async (req, res, next) => {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized(req)

  if (!roles.includes(userRole.superAdmin)) {
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
      method: ['GET'],
      maxAgeSeconds: 3600,
      responseHeader: ['Content-Type'],
    },
  ])

  console.info(`Bucket ${getEnvVarOrThrow('BUCKET_NAME')} CORS were updated`)

  res.json(corsUpdateRes.at(0)?.cors)
}

setBucketCors.get('/', configureBucketCors)
