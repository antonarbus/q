import { Storage } from '@google-cloud/storage'
import express from 'express'

// https://cloud.google.com/storage/docs/using-cors#storage-get-bucket-metadata-nodejs

const storage = new Storage({
  keyFilename: './quotationapp-8014c-04cff2d88d5b.json',
  projectId: 'quotationapp-8014c',
})

const bucketName = 'quotation-app-bucket'

async function getBucketMetadata(): Promise<void> {
  const [metadata] = await storage.bucket(bucketName).getMetadata()
  console.info(JSON.stringify(metadata, null, 2))
}

export const getBucketCors = express.Router()

getBucketCors.get(
  '/',
  getBucketMetadata,
)
