import { z } from 'zod'

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
  // ENVIRONMENT indicates which deployed environment we're running against
  // ENVIRONMENT=unknown used during build
  // ENVIRONMENT=local should be set in package.json scripts for local development, but to make scripts short made it default value
  // ENVIRONMENT=dev (test | pilot | prod) in Cloud Run deployments via updateCloudRunService.ts (by --set-env-vars gcloud CLI flag)
  ENVIRONMENT: z
    .enum(['unknown', 'local', 'dev', 'test', 'pilot', 'prod'])
    .optional()
    .default('local'),
})

export const processEnv =
  typeof process === 'undefined'
    ? {
        NODE_ENV: 'development' as const,
        CI: false,
        ENVIRONMENT: 'unknown' as const,
      }
    : processEnvSchema.parse(process.env)
