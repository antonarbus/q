/* eslint-disable camelcase */
import { Storage } from '@google-cloud/storage'
import { secret } from '@root/config/secrets'

//* https://console.cloud.google.com/storage/browser/quotation-app-bucket
//* https://cloud.google.com/nodejs/docs/reference/storage/latest

// Google Auth Library expects snake_case properties in the credentials object
// despite TypeScript types suggesting camelCase
type ServiceAccountCredentials = {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  token_uri: string
}

const credentials: ServiceAccountCredentials = {
  type: secret.GOOGLE_CLOUD_PROJECT_TYPE,
  project_id: secret.GOOGLE_CLOUD_PROJECT_ID,
  private_key_id: secret.GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID,
  private_key: secret.GOOGLE_CLOUD_PROJECT_PRIVATE_KEY,
  client_email: secret.GOOGLE_CLOUD_PROJECT_CLIENT_EMAIL,
  client_id: secret.GOOGLE_CLOUD_PROJECT_CLIENT_ID,
  token_uri: secret.GOOGLE_CLOUD_PROJECT_TOKEN_URL,
}

const storageInstance = new Storage({ credentials })

export const bucket = storageInstance.bucket(secret.BUCKET_NAME)

const STORAGE_BASE_URL = `https://storage.googleapis.com/${secret.BUCKET_NAME}`

type Props = { id: string }

type Res = {
  path: string
  url: string
}

export const getFileInfo = ({ id }: Props): Res => {
  const fileInfo = {
    path: id,
    url: `${STORAGE_BASE_URL}/${id}`,
  }

  return fileInfo
}
