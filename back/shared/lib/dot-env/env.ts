import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  // App config
  INSTALLATION: z.enum(['local', 'production']),
  CI: z
    .string()
    .optional()
    .transform((val) => val === 'true'),

  // Database
  MONGO_DB_NAME: z.string().min(1),
  MONGO_DB_CONNECTION_STRING: z.string().min(1),

  // Email
  MAILERSEND_API_KEY: z.string().min(1),

  // JWT secrets
  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),

  // Google Cloud Storage
  BUCKET_NAME: z.string().min(1),
  GOOGLE_CLOUD_PROJECT_TYPE: z.string().min(1),
  GOOGLE_CLOUD_PROJECT_ID: z.string().min(1),
  GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID: z.string().min(1),
  GOOGLE_CLOUD_PROJECT_PRIVATE_KEY: z.string().min(1),
  GOOGLE_CLOUD_PROJECT_CLIENT_EMAIL: z.string().min(1),
  GOOGLE_CLOUD_PROJECT_CLIENT_ID: z.string().min(1),
  GOOGLE_CLOUD_PROJECT_TOKEN_URL: z.string().min(1),
})

// Parse and validate all environment variables at startup
export const env = envSchema.parse(process.env)
