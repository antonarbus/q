import { Storage, type Bucket } from '@google-cloud/storage'
import { sharedInfraConfig } from '@back/config/infrastructure'
import { storageConfig } from '@back/config/storage'
import { getSecret } from '../secret-manager/getSecret'

//* https://console.cloud.google.com/storage/browser
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

let bucketInstance: Bucket | null = null

export const getBucket = async (): Promise<Bucket> => {
  if (bucketInstance !== null) {
    return bucketInstance
  }

  const [privateKeyId, privateKey] = await Promise.all([
    getSecret('GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID'),
    getSecret('GOOGLE_CLOUD_PROJECT_PRIVATE_KEY'),
  ])

  const credentials: ServiceAccountCredentials = {
    type: sharedInfraConfig.gcpServiceAccountType,
    project_id: sharedInfraConfig.projectId,
    private_key_id: privateKeyId,
    private_key: privateKey,
    client_email: sharedInfraConfig.gcpServiceAccountClientEmail,
    client_id: sharedInfraConfig.gcpServiceAccountClientId,
    token_uri: sharedInfraConfig.gcpServiceAccountTokenUrl,
  }

  const storage = new Storage({ credentials })

   require-atomic-updates
  bucketInstance = storage.bucket(storageConfig.bucketName)

  return bucketInstance
}

type GetFileInfoProps = { id: string }

type GetFileInfoRes = {
  path: string
  url: string
}

export const getFileInfo = (props: GetFileInfoProps): GetFileInfoRes => {
  const fileInfo = {
    path: props.id,
    url: `https://storage.googleapis.com/${storageConfig.bucketName}/${props.id}`,
  }

  return fileInfo
}
