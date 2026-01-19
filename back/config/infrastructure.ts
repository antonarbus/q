// eslint-disable-next-line id-length
import z from 'zod'
import type { DeployedEnvironment } from '@root/config/environment'
import { DOMAIN } from '@root/config/domain'

//* MODIFY
export const sharedInfraConfig = {
  // Google Cloud Project
  projectId: 'quotationapp-8014c',
  projectNumber: '665701178658',
  region: 'us-central1',

  // Google Cloud Service Account (non-sensitive, secrets in secrets.ts)
  gcpServiceAccountType: 'service_account',
  gcpServiceAccountClientEmail:
    'cloud-storage-service-account@quotationapp-8014c.iam.gserviceaccount.com',
  gcpServiceAccountClientId: '106875911907528867969',
  gcpServiceAccountTokenUrl: 'https://oauth2.googleapis.com/token',

  // GitHub
  githubRepository: 'antonarbus/q',

  // Terraform State
  bucketForTerraformStateName: 'quotationapp-terraform-state',

  // Artifact Registry (Docker images)
  artifactRegistryName: 'docker-images',
  dockerImageName: 'web-app',

  // Service Accounts
  githubActionsSaName: 'github-actions-sa',
  cloudRunSaName: 'cloud-run-sa',

  // Storage Bucket
  storageBucketLocation: 'US',
  storageBucketCorsOrigins: [
    'https://sendmequotation.today',
    'http://sendmequotation.today',
    'https://*.sendmequotation.today',
    'http://*.sendmequotation.today',
    'http://local.sendmequotation.today:3000',
    'https://local.sendmequotation.today:3000',
    'http://localhost:3000',
    'https://localhost:3000',
    '*',
  ],

  // Cloud Run Configuration
  // Cloud Run will set PORT env var to this value automatically
  minInstances: '0',
  maxInstances: '5',
  cpuLimit: '1',
  memoryLimit: '512Mi',
  containerPort: '8080',

  // Neon PostgreSQL Database
  // NOTE: One shared project across all environments
  // Each environment has its own database within the shared project
  // neonApiKey is in secrets.ts (not exposed to frontend)
  neonProjectId: 'noisy-water-33471538', // Shared project ID
  neonOrgId: 'org-winter-tree-49001956', // Organization ID
  neonProjectName: 'q', // Project name (for reference)
  neonRegion: 'aws-us-east-2', // Close to us-central1
  neonPgVersion: '16',
  neonMinCu: 0.25, // Free tier minimum
  neonMaxCu: 0.25, // Keep at 0.25 to minimize costs (free tier max is 2)
} as const

type InfraConfig = Record<
  DeployedEnvironment,
  typeof sharedInfraConfig & {
    cloudRunServiceName: string
    domain: string
    neonDatabaseName: string
    storageBucketName: string
    environment: string
  }
>

//* DO NOT MODIFY, does not hurt
export const infraConfig = {
  prod: {
    ...sharedInfraConfig,
    cloudRunServiceName: `web-app-prod`,
    domain: DOMAIN,
    neonDatabaseName: 'prod', // Production database
    storageBucketName: 'quotation-app-prod', // Also used by pilot
    environment: 'prod',
  },
  pilot: {
    ...sharedInfraConfig,
    cloudRunServiceName: `web-app-pilot`,
    domain: `pilot.${DOMAIN}`,
    neonDatabaseName: 'prod', // Shares production database
    storageBucketName: 'quotation-app-prod', // Shares production bucket
    environment: 'pilot',
  },
  test: {
    ...sharedInfraConfig,
    cloudRunServiceName: `web-app-test`,
    domain: `test.${DOMAIN}`,
    neonDatabaseName: 'test', // Test database
    storageBucketName: 'quotation-app-test',
    environment: 'test',
  },
  dev: {
    ...sharedInfraConfig,
    cloudRunServiceName: `web-app-dev`,
    domain: `dev.${DOMAIN}`,
    neonDatabaseName: 'dev', // Development database
    storageBucketName: 'quotation-app-dev', // Also used by local and unknown
    environment: 'dev',
  },
} as const satisfies InfraConfig

// * MODIFY (if needed)

/**
 * Defines which environment master/main branch deploys to
 * - For production-only repos: set to 'prod'
 * - For repos with staging: set to 'dev'
 * - If set to 'dev' and you need to push hot-fix asap, switch to 'prod'
 */
export const MASTER_DEPLOYS_TO_ENVIRONMENT: DeployedEnvironment = 'dev'

/**
 * Allowed promotion paths for environments (e.g., dev → test → pilot → prod)
 *
 * NOTE: When MASTER_DEPLOYS_TO_ENV is set to 'prod' (direct master → prod workflow),
 * these promotion paths are NOT applicable and deployment happens directly from master branch.
 * All environment stages (dev, test, pilot) are kept here as a template for future use
 * and do not harm the production-only workflow.
 *
 * * DO NOT MODIFY, but may (most likely this is correct)
 * * If modified, then to be aligned with .github/workflows/promote.yml:12
 */
export const allowedPromotionPath = [
  `dev-test`,
  `test-pilot`,
  `pilot-prod`,
] as const

export const allowedPromotionPathSchema = z.enum(allowedPromotionPath)

export type AllowedPromotionPath = z.infer<typeof allowedPromotionPathSchema>
