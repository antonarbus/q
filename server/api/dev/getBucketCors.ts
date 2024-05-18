import { bucket } from '@server/services/storage'
import express from 'express'
import { type Req, type Res } from '../../types'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

async function getBucketMetadata(_req: Req, res: Res): Promise<void> {
  const [metadata] = await bucket.getMetadata()
  console.info(JSON.stringify(metadata, null, 2))
  res.json(metadata.cors)
}

export const getBucketCors = express.Router()

getBucketCors.get('/', getBucketMetadata)
