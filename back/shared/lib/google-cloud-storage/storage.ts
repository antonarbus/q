/* eslint-disable camelcase */
import { getEnvVarOrThrow } from '@back/shared/lib/dot-env'
import { Storage } from '@google-cloud/storage'

//* https://console.cloud.google.com/storage/browser/quotation-app-bucket
//* https://cloud.google.com/nodejs/docs/reference/storage/latest

const storageInstance = new Storage({
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

const bucketName = getEnvVarOrThrow('BUCKET_NAME')

export const bucket = storageInstance.bucket(bucketName)

const STORAGE_BASE_URL = `https://storage.googleapis.com/${bucketName}`

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
