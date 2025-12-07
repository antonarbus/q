import { Storage } from '@google-cloud/storage'
import { secret } from '../../../../config/secrets'

//* https://console.cloud.google.com/storage/browser/quotation-app-bucket
//* https://cloud.google.com/nodejs/docs/reference/storage/latest

const storageInstance = new Storage({
  credentials: {
    type: secret.GOOGLE_CLOUD_PROJECT_TYPE,
    projectId: secret.GOOGLE_CLOUD_PROJECT_ID,
    privateKeyId: secret.GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID,
    privateKey: secret.GOOGLE_CLOUD_PROJECT_PRIVATE_KEY,
    clientEmail: secret.GOOGLE_CLOUD_PROJECT_CLIENT_EMAIL,
    clientId: secret.GOOGLE_CLOUD_PROJECT_CLIENT_ID,
    tokenUrl: secret.GOOGLE_CLOUD_PROJECT_TOKEN_URL,
  },
})

export const bucket = storageInstance.bucket(secret.BUCKET_NAME)

const STORAGE_BASE_URL = `https://storage.googleapis.com/${secret.BUCKET_NAME}`

type Props = {
  id: string
}

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
