import express from 'express'
import { bucket } from '../../services/storage'
import type { Req, Res, Next } from '../../types'

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

async function configureBucketCors(
  _req: Req,
  res: Res,
  next: Next,
): Promise<void> {
  const corsUpdateRes = await bucket.setCorsConfiguration([
    {
      origin: [
        'https://sendmequotation.today',
        'http://sendmequotation.today',
        'https://*.sendmequotation.today',
        'http://*.sendmequotation.today',
        'http://local.sendmequotation.today:3000/', // pdf download does not work without port
        'https://local.sendmequotation.today:3000/', // pdf download does not work without port
        'http://localhost:3000', // pdf download does not work without port
        'https://localhost:3000', // pdf download does not work without port
      ],
      method: ['get'],
      maxAgeSeconds: 3600,
      responseHeader: ['Content-Type'],
    },
  ])

  console.info(
    `Bucket ${process.env.BUCKET_NAME ?? 'fake bucket name to suppress ts'} was updated with a CORS config`,
  )

  res.json(corsUpdateRes.at(0)?.cors)
}

export const setBucketCors = express.Router()

setBucketCors.get('/', (req, res, next) => {
  void configureBucketCors(req, res, next)
})
