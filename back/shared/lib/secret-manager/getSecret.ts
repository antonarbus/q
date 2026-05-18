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
  | 'STRIPE_SECRET_KEY_TEST'
  | 'STRIPE_SECRET_KEY_LIVE'
  | 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV'
  | 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_TEST'
  | 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_PILOT'
  | 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_LIVE'
  | 'STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV'
  | 'STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_TEST'
  | 'STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_PILOT'
  | 'STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_LIVE'
  | 'STRIPE_CLIENT_ID_TEST'
  | 'STRIPE_CLIENT_ID_LIVE'
  | 'STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_TEST'
  | 'STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_LIVE'
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
  STRIPE_SECRET_KEY_TEST: null,
  STRIPE_SECRET_KEY_LIVE: null,
  STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV: null,
  STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_TEST: null,
  STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_PILOT: null,
  STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_LIVE: null,
  STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV: null,
  STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_TEST: null,
  STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_PILOT: null,
  STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_LIVE: null,
  STRIPE_CLIENT_ID_TEST: null,
  STRIPE_CLIENT_ID_LIVE: null,
  STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_TEST: null,
  STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_LIVE: null,
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
