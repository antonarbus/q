import { runtimeConfig } from '@root/config/runtime'
import { infraConfig } from './infrastructure'

export const storageConfig = {
  get bucketName() {
    if (runtimeConfig.environment === 'prod') {
      return infraConfig.prod.storageBucketName
    }

    // same as in prod
    if (runtimeConfig.environment === 'pilot') {
      return infraConfig.pilot.storageBucketName
    }

    if (runtimeConfig.environment === 'test') {
      return infraConfig.test.storageBucketName
    }

    // dev | local | unknown
    return infraConfig.dev.storageBucketName
  },
} as const
