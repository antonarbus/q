import { z } from 'zod'
import { runtimeEnvSchema } from './environment'

const processEnvSchema = z.object({
  // NODE_ENV=development should be set at package.json scripts, but we make it default value to make scripts short
  // NODE_ENV=production is set at Dockerfile.prod.front (not really useful) & Dockerfile.prod.back
  // NODE_ENV=test is set by vitest
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  // CI=true is set by GitHub Actions (and other CI platforms)
  CI: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  // ENVIRONMENT indicates the runtime environment context
  // See config/environment.ts for detailed explanation of each value
  // ENVIRONMENT=unknown - Build time (Docker images)
  // ENVIRONMENT=local - Local development (default)
  // ENVIRONMENT=dev|test|pilot|prod - Cloud Run deployments (set via --set-env-vars)
  ENVIRONMENT: runtimeEnvSchema.optional().default('local'),
})

export const processEnv =
  typeof process === 'undefined'
    ? {
        NODE_ENV: 'development' as const,
        CI: false,
        ENVIRONMENT: 'unknown' as const,
      }
    : processEnvSchema.parse(process.env)
