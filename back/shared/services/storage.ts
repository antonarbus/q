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

type Props1 = { fileType: 'file'; fileId: string }
type Props2 = { fileType: 'quotation'; quotationId: string }
type Props3 = { fileType: 'bookmark'; bookmarkId: string }
type Props = Props1 | Props2 | Props3

export const getFolderPath = (
  props: Omit<Props, 'fileId' | 'quotationId' | 'bookmarkId'>,
): string => {
  if (props.fileType === 'quotation') {
    return `quotations/`
  }

  if (props.fileType === 'bookmark') {
    return `bookmarks/`
  }

  return `files/`
}

export const getFilePath = (props: Props): string => {
  if (props.fileType === 'quotation') {
    return `quotations/${props.quotationId}`
  }

  if (props.fileType === 'bookmark') {
    return `bookmarks/${props.bookmarkId}`
  }

  return `files/${props.fileId}`
}

export const fileBaseUrl = `https://storage.googleapis.com/${bucketName}`
