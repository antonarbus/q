// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage'
import express from 'express'
import { type Req, type Res } from '../types'

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

const storage = new Storage({
  keyFilename: './quotationapp-8014c-04cff2d88d5b.json',
  projectId: 'quotationapp-8014c',
})

const bucketName = 'quotation-app-bucket'

async function configureBucketCors(_req: Req, res: Res): Promise<void> {
  const corsUpdateRes = await storage.bucket(bucketName).setCorsConfiguration([
    {
      origin: [
        'https://quotation.app',
        'http://quotation.app',
        'https://*.quotation.app',
        'http://*.quotation.app',
      ],
      method: ['GET'],
      maxAgeSeconds: 3600,
      responseHeader: ['Content-Type'],
    },
  ])

  console.info(`
    Bucket ${bucketName} was updated with a CORS config
  `)

  res.json(corsUpdateRes.at(0)?.cors)
}

export const setBucketCors = express.Router()

setBucketCors.get('/', configureBucketCors)
