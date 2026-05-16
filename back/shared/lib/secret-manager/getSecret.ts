import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { sharedInfraConfig } from '@back/config/infrastructure'

export type SecretName =
  | 'JWT_ACCESS_SECRET'
  | 'JWT_REFRESH_SECRET'
  | 'MAILERSEND_API_KEY'
  | 'NEON_API_KEY'
  | 'NEON_DATABASE_URL_DEV'
  | 'NEON_DATABASE_URL_TEST'
  | 'NEON_DATABASE_URL_PROD'
  | 'GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID'
  | 'GOOGLE_CLOUD_PROJECT_PRIVATE_KEY'
  | 'STRIPE_TEST_SECRET_KEY'
  | 'STRIPE_LIVE_SECRET_KEY'
  | 'STRIPE_DEV_WEBHOOK_SECRET'
  | 'STRIPE_TEST_WEBHOOK_SECRET'
  | 'STRIPE_PILOT_WEBHOOK_SECRET'
  | 'STRIPE_LIVE_WEBHOOK_SECRET'
  | 'STRIPE_TEST_CLIENT_ID'
  | 'STRIPE_LIVE_CLIENT_ID'
  | 'STRIPE_TEST_SUBSCRIPTION_PRICE_MONTHLY'
  | 'STRIPE_TEST_SUBSCRIPTION_PRICE_ANNUAL'
  | 'STRIPE_LIVE_SUBSCRIPTION_PRICE_MONTHLY'
  | 'STRIPE_LIVE_SUBSCRIPTION_PRICE_ANNUAL'
  | 'GEMINI_API_KEY'

const cachedSecrets: Record<SecretName, string | null> = {
  JWT_ACCESS_SECRET: null,
  JWT_REFRESH_SECRET: null,
  MAILERSEND_API_KEY: null,
  NEON_API_KEY: null,
  NEON_DATABASE_URL_DEV: null,
  NEON_DATABASE_URL_TEST: null,
  NEON_DATABASE_URL_PROD: null,
  GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID: null,
  GOOGLE_CLOUD_PROJECT_PRIVATE_KEY: null,
  STRIPE_TEST_SECRET_KEY: null,
  STRIPE_LIVE_SECRET_KEY: null,
  STRIPE_DEV_WEBHOOK_SECRET: null,
  STRIPE_TEST_WEBHOOK_SECRET: null,
  STRIPE_PILOT_WEBHOOK_SECRET: null,
  STRIPE_LIVE_WEBHOOK_SECRET: null,
  STRIPE_TEST_CLIENT_ID: null,
  STRIPE_LIVE_CLIENT_ID: null,
  STRIPE_TEST_SUBSCRIPTION_PRICE_MONTHLY: null,
  STRIPE_TEST_SUBSCRIPTION_PRICE_ANNUAL: null,
  STRIPE_LIVE_SUBSCRIPTION_PRICE_MONTHLY: null,
  STRIPE_LIVE_SUBSCRIPTION_PRICE_ANNUAL: null,
  GEMINI_API_KEY: null,
}

export const getSecret = async (secretName: SecretName): Promise<string> => {
  if (cachedSecrets[secretName] !== null) {
    return cachedSecrets[secretName]
  }

  // Secrete found in .env will be used (required for stripe local test)
  // oxlint-disable-next-line node/no-process-env
  const envValue = process.env[secretName]

  if (envValue !== undefined) {
    cachedSecrets[secretName] = envValue

    return envValue
  }

  const client = new SecretManagerServiceClient()

  const [accessResponse] = await client.accessSecretVersion({
    name: `projects/${sharedInfraConfig.projectId}/secrets/${secretName}/versions/latest`,
  })

  if (accessResponse.payload?.data === undefined || accessResponse.payload.data === null) {
    throw new Error('Secrete not found')
  }

  const secreteValue = accessResponse.payload.data.toString('utf8')

  cachedSecrets[secretName] = secreteValue

  return secreteValue
}
