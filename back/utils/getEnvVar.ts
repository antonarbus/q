import dotenv from 'dotenv'

dotenv.config()

type EnvVarName =
  | 'INSTALLATION'
  | 'CI'
  | 'BUCKET_NAME'
  | 'MONGO_DB_CONNECTION_STRING'
  | 'SENDGRID_API_KEY'
  | 'JWT_ACCESS_SECRET'
  | 'JWT_REFRESH_SECRET'
  | 'GOOGLE_CLOUD_PROJECT_TYPE'
  | 'GOOGLE_CLOUD_PROJECT_ID'
  | 'GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID'
  | 'GOOGLE_CLOUD_PROJECT_PRIVATE_KEY'
  | 'GOOGLE_CLOUD_PROJECT_CLIENT_EMAIL'
  | 'GOOGLE_CLOUD_PROJECT_CLIENT_ID'
  | 'GOOGLE_CLOUD_PROJECT_TOKEN_URL'

export const getEnvVar = (varName: EnvVarName): string | undefined => {
  const value = process.env[varName]

  return value
}

export const getEnvVarOrThrow = (varName: EnvVarName): string => {
  const value = process.env[varName]

  if (value === undefined) {
    throw new Error(`Env var: "${varName}" has not been set`)
  }

  return value
}
