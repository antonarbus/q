/* eslint-disable camelcase */
import { getEnvVarOrThrow } from '@back/utils/getEnvVar'
import { Storage } from '@google-cloud/storage'

//* https://console.cloud.google.com/storage/browser/quotation-app-bucket
//* https://cloud.google.com/nodejs/docs/reference/storage/latest

const storage = new Storage({
  credentials: {
    type: getEnvVarOrThrow('GOOGLE_CLOUD_PROJECT_TYPE'),
    project_id: getEnvVarOrThrow('GOOGLE_CLOUD_PROJECT_ID'),
    private_key_id: getEnvVarOrThrow('GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID'),
    private_key: getEnvVarOrThrow('GOOGLE_CLOUD_PROJECT_PRIVATE_KEY'),
    client_email: getEnvVarOrThrow('GOOGLE_CLOUD_PROJECT_CLIENT_EMAIL'),
    client_id: getEnvVarOrThrow('GOOGLE_CLOUD_PROJECT_CLIENT_ID'),
    token_url: getEnvVarOrThrow('GOOGLE_CLOUD_PROJECT_TOKEN_URL'),
  },
})

export const bucket = storage.bucket(getEnvVarOrThrow('BUCKET_NAME'))

export const storageFolderName = {
  bookmarks: 'bookmarks',
  quotations: 'quotations',
  files: 'files',
} as const
