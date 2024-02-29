import { Storage } from '@google-cloud/storage'
import express from 'express'
import { type Req, type Res } from '../types'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

const storage = new Storage({
  keyFilename: './quotationapp-8014c-04cff2d88d5b.json',
  projectId: 'quotationapp-8014c',
})

async function getBucketMetadata(_req: Req, res: Res): Promise<void> {
  const [metadata] = await storage.bucket(process.env.BUCKET_NAME!).getMetadata()
  console.info(JSON.stringify(metadata, null, 2))
  res.json(metadata.cors)
}

export const getBucketCors = express.Router()

getBucketCors.get('/', getBucketMetadata)
