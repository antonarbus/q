// eslint-disable-next-line id-length
import z from 'zod'
import type { DeployedEnv } from './environment'

//* MODIFY
export const DOMAIN = 'sendmequotation.today'

//* MODIFY
export const sharedInfraConfigVariables = {
  // Google Cloud Project
  projectId: 'quotationapp-8014c',
  projectNumber: '665701178658',
  region: 'us-central1',

  // GitHub
  githubRepository: 'antonarbus/q',

  // Terraform State
  bucketForTerraformStateName: 'quotationapp-terraform-state',

  // Artifact Registry (Docker images)
  artifactRegistryName: 'docker-images',
  dockerImageNameFrontend: 'web-app-frontend',
  dockerImageNameBackend: 'web-app-backend',

  // Service Accounts
  githubActionsSaName: 'github-actions-sa',
  cloudRunSaName: 'cloud-run-sa',

  // Storage Bucket (shared across all environments)
  storageBucketName: 'quotation-app-bucket',
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

  // Cloud Run Configuration - Frontend
  minInstancesFrontend: '0',
  maxInstancesFrontend: '5',
  cpuLimitFrontend: '1',
  memoryLimitFrontend: '512Mi',
  containerPortFrontend: '80',

  // Cloud Run Configuration - Backend
  minInstancesBackend: '0',
  maxInstancesBackend: '5',
  cpuLimitBackend: '1',
  memoryLimitBackend: '512Mi',
  containerPortBackend: '4000',
} as const

//* DO NOT MODIFY, does not hurt
export const infraConfigVariables = {
  prod: {
    ...sharedInfraConfigVariables,
    cloudRunServiceNameFrontend: `web-app-frontend-prod`,
    cloudRunServiceNameBackend: `web-app-backend-prod`,
    customDomainFrontend: DOMAIN,
    customDomainBackend: `api.${DOMAIN}`,
    environment: 'prod',
  },
  pilot: {
    ...sharedInfraConfigVariables,
    cloudRunServiceNameFrontend: `web-app-frontend-pilot`,
    cloudRunServiceNameBackend: `web-app-backend-pilot`,
    customDomainFrontend: `pilot.${DOMAIN}`,
    customDomainBackend: `api-pilot.${DOMAIN}`,
    environment: 'pilot',
  },
  test: {
    ...sharedInfraConfigVariables,
    cloudRunServiceNameFrontend: `web-app-frontend-test`,
    cloudRunServiceNameBackend: `web-app-backend-test`,
    customDomainFrontend: `test.${DOMAIN}`,
    customDomainBackend: `api-test.${DOMAIN}`,
    environment: 'test',
  },
  dev: {
    ...sharedInfraConfigVariables,
    cloudRunServiceNameFrontend: `web-app-frontend-dev`,
    cloudRunServiceNameBackend: `web-app-backend-dev`,
    customDomainFrontend: `dev.${DOMAIN}`,
    customDomainBackend: `api-dev.${DOMAIN}`,
    environment: 'dev',
  },
} as const

export type InfraConfigVariables =
  (typeof infraConfigVariables)[keyof typeof infraConfigVariables]

// * MODIFY (if needed)

/**
 * Defines which environment master/main branch deploys to
 * - For production-only repos: set to 'prod'
 * - For repos with staging: set to 'dev'
 * - If set to 'dev' and you need to push hot-fix asap, switch to 'prod'
 */
export const MASTER_DEPLOYS_TO_ENV: DeployedEnv = 'dev'

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
