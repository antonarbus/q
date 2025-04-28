/* eslint-disable camelcase */
import { getEnvVarOrThrow } from '@back/shared/utils/getEnvVar'
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

type Props1 = { fileType: 'file'; fileId: string }
type Props2 = { fileType: 'quotation'; quotationId: string }
type Props3 = { fileType: 'bookmark'; bookmarkId: string }
type Props = Props1 | Props2 | Props3

type Res = {
  path: string
  url: string
}

export const getFileInfo = (props: Props): Res => {
  if (props.fileType === 'quotation') {
    const fileInfo = {
      path: `quotations/${props.quotationId}`,
      url: `${STORAGE_BASE_URL}/quotations/${props.quotationId}`,
    }

    return fileInfo
  }

  if (props.fileType === 'bookmark') {
    const fileInfo = {
      path: `bookmarks/${props.bookmarkId}`,
      url: `${STORAGE_BASE_URL}/bookmarks/${props.bookmarkId}`,
    }

    return fileInfo
  }

  const fileInfo = {
    path: `files/${props.fileId}`,
    url: `${STORAGE_BASE_URL}/files/${props.fileId}`,
  }

  return fileInfo
}
