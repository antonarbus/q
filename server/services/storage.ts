import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_PROJECT_FILE_KEY,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
})

export const bucket = storage.bucket(process.env.BUCKET_NAME!)
