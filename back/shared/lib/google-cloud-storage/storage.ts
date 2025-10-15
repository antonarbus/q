import { Storage } from '@google-cloud/storage'
import { env } from '../dot-env'

//* https://console.cloud.google.com/storage/browser/quotation-app-bucket
//* https://cloud.google.com/nodejs/docs/reference/storage/latest

const storageInstance = new Storage({
  credentials: {
    type: env.GOOGLE_CLOUD_PROJECT_TYPE,
    project_id: env.GOOGLE_CLOUD_PROJECT_ID,
    private_key_id: env.GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID,
    private_key: env.GOOGLE_CLOUD_PROJECT_PRIVATE_KEY,
    client_email: env.GOOGLE_CLOUD_PROJECT_CLIENT_EMAIL,
    client_id: env.GOOGLE_CLOUD_PROJECT_CLIENT_ID,
    token_url: env.GOOGLE_CLOUD_PROJECT_TOKEN_URL,
  },
})

export const bucket = storageInstance.bucket(env.BUCKET_NAME)

const STORAGE_BASE_URL = `https://storage.googleapis.com/${env.BUCKET_NAME}`

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
