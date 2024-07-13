import { Storage } from '@google-cloud/storage'

//* https://console.cloud.google.com/storage/browser/quotation-app-bucket
//* https://cloud.google.com/nodejs/docs/reference/storage/latest

const storage = new Storage({
  // keyFilename: process.env.GOOGLE_CLOUD_PROJECT_FILE_KEY,
  // projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    type: process.env.GOOGLE_CLOUD_PROJECT_TYPE,
    project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
    private_key_id: process.env.GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_CLOUD_PROJECT_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLOUD_PROJECT_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLOUD_PROJECT_CLIENT_ID,
    token_url: process.env.GOOGLE_CLOUD_PROJECT_TOKEN_URL,
  },
})

export const bucket = storage.bucket(
  process.env.BUCKET_NAME ?? 'fake bucket name to suppress ts check',
)

export const storageFolderName = {
  bookmarks: 'bookmarks',
  quotations: 'quotations',
  files: 'files',
} as const
