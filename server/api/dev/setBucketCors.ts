import { bucket } from '@server/services/storage'
import express from 'express'
import { type Req, type Res } from '../../types'

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

async function configureBucketCors(_req: Req, res: Res): Promise<void> {
  const corsUpdateRes = await bucket.setCorsConfiguration([
    {
      origin: [
        'https://quotation.app',
        'http://quotation.app',
        'https://*.quotation.app',
        'http://*.quotation.app',
        'http://local.quotation.app:3005/', // pdf download does not work without port
        'https://local.quotation.app:3005/', // pdf download does not work without port
      ],
      method: ['GET'],
      maxAgeSeconds: 3600,
      responseHeader: ['Content-Type'],
    },
  ])

  console.info(
    `Bucket ${process.env.BUCKET_NAME!} was updated with a CORS config`,
  )

  res.json(corsUpdateRes.at(0)?.cors)
}

export const setBucketCors = express.Router()

setBucketCors.get('/', configureBucketCors)
