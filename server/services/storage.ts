import { Storage } from '@google-cloud/storage'

//* https://console.cloud.google.com/storage/browser/quotation-app-bucket
//* https://cloud.google.com/nodejs/docs/reference/storage/latest

const storage = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_PROJECT_FILE_KEY,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
})

export const bucket = storage.bucket(process.env.BUCKET_NAME!)

export const storageFolderName = {
  bookmarks: 'bookmarks',
  quotations: 'quotations',
  files: 'files',
} as const
