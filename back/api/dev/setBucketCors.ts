import express from 'express'
import { bucket } from '../../services/storage'
import type { Req, Res, Next } from '../../types'
import { getEnvVarOrThrow } from '@back/utils/getEnvVar'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/utils/jwt'
import { httpStatus } from '@back/consts/httpStatus'

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

async function configureBucketCors(
  req: Req,
  res: Res,
  next: Next,
): Promise<void> {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized(req)

  if (!roles.includes('super-admin')) {
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

export const setBucketCors = express.Router()

setBucketCors.get('/', (req, res, next) => {
  void configureBucketCors(req, res, next)
})
