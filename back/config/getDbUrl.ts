import { runtimeConfig } from '@root/config/runtime'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'

export const getDbUrl = async (): Promise<string> => {
  if (runtimeConfig.environment === 'prod') {
    const NEON_DATABASE_URL = await getSecret('NEON_DATABASE_URL_PROD')

    return NEON_DATABASE_URL
  }

  // same as in prod
  if (runtimeConfig.environment === 'pilot') {
    const NEON_DATABASE_URL = await getSecret('NEON_DATABASE_URL_PROD')

    return NEON_DATABASE_URL
  }

  if (runtimeConfig.environment === 'test') {
    const NEON_DATABASE_URL = await getSecret('NEON_DATABASE_URL_TEST')

    return NEON_DATABASE_URL
  }

  // dev | local | unknown
  const NEON_DATABASE_URL = await getSecret('NEON_DATABASE_URL_DEV')

  return NEON_DATABASE_URL
}
