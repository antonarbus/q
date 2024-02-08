// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage'
import express from 'express'

// https://cloud.google.com/storage/docs/samples/storage-cors-configuration#storage_cors_configuration-nodejs

const storage = new Storage({
  keyFilename: './quotationapp-8014c-04cff2d88d5b.json',
  projectId: 'quotationapp-8014c',
})

const bucketName = 'quotation-app-bucket'
const origin = '*'
const responseHeader = 'Content-Type'
const method = 'GET'

async function configureBucketCors(): Promise<void> {
  await storage.bucket(bucketName).setCorsConfiguration([
    {
      // maxAgeSeconds,
      method: [method],
      origin: [origin],
      responseHeader: [responseHeader],
    },
  ])

  console.info(`
    Bucket ${bucketName} was updated with a CORS config
    to allow ${method} requests from ${origin} sharing 
    ${responseHeader} responses across origins
  `)
}

configureBucketCors().catch(console.error)

export const setBucketCors = express.Router()

setBucketCors.get(
  '/',
  configureBucketCors,
)
