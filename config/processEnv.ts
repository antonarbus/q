import { z } from 'zod'

const processEnvSchema = z.object({
  // NODE_ENV=development is set at package.json scripts
  // NODE_ENV=production is set at Dockerfile.prod.front & Dockerfile.prod.back
  // NODE_ENV=test is set by vitest
  NODE_ENV: z.enum(['production', 'development', 'test']),
  // CI is set by GitHub Actions (and other CI platforms)
  CI: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  // ENVIRONMENT indicates which deployed environment we're running against
  // Optional during build (defaults to 'unknown')
  // Set to 'local' for local development in package.json scripts
  // Set to 'dev' | 'test' | 'pilot' | 'prod' in Cloud Run deployments (via updateCloudRunService.ts by --set-env-vars gcloud CLI flag)
  ENVIRONMENT: z
    .enum(['local', 'dev', 'test', 'pilot', 'prod', 'unknown'])
    .optional()
    .default('unknown'),
})

export const processEnv =
  typeof process !== 'undefined'
    ? processEnvSchema.parse(process.env)
    : {
        NODE_ENV: 'development' as const,
        CI: false,
        ENVIRONMENT: 'unknown' as const,
      }
