import z from 'zod'

//* MODIFY
const DOMAIN = 'sendmequotation.today'

/**
 * The .tfvars files are GENERATED from this file by `bun deploy-scripts/cli.ts generate-tfvars`
 * * DO NOT MODIFY, does not hurt.
 */
const envName = {
  dev: 'dev',
  test: 'test',
  pilot: 'pilot',
  prod: 'prod',
} as const

//* DO NOT MODIFY, does not hurt.
export const envSchema = z.enum([
  envName.dev,
  envName.test,
  envName.pilot,
  envName.prod,
])

export type Env = z.infer<typeof envSchema>

//* MODIFY
export const sharedConfigVariables = {
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
export const configVariables = {
  [envName.prod]: {
    ...sharedConfigVariables,
    cloudRunServiceNameFrontend: `web-app-frontend-${envName.prod}`,
    cloudRunServiceNameBackend: `web-app-backend-${envName.prod}`,
    customDomainFrontend: DOMAIN,
    customDomainBackend: `api.${DOMAIN}`,
    environment: envName.prod,
  },
  [envName.pilot]: {
    ...sharedConfigVariables,
    cloudRunServiceNameFrontend: `web-app-frontend-${envName.pilot}`,
    cloudRunServiceNameBackend: `web-app-backend-${envName.pilot}`,
    customDomainFrontend: `${envName.pilot}.${DOMAIN}`,
    customDomainBackend: `api-${envName.pilot}.${DOMAIN}`,
    environment: envName.pilot,
  },
  [envName.test]: {
    ...sharedConfigVariables,
    cloudRunServiceNameFrontend: `web-app-frontend-${envName.test}`,
    cloudRunServiceNameBackend: `web-app-backend-${envName.test}`,
    customDomainFrontend: `${envName.test}.${DOMAIN}`,
    customDomainBackend: `api-${envName.test}.${DOMAIN}`,
    environment: envName.test,
  },
  [envName.dev]: {
    ...sharedConfigVariables,
    cloudRunServiceNameFrontend: `web-app-frontend-${envName.dev}`,
    cloudRunServiceNameBackend: `web-app-backend-${envName.dev}`,
    customDomainFrontend: `${envName.dev}.${DOMAIN}`,
    customDomainBackend: `api-${envName.dev}.${DOMAIN}`,
    environment: envName.dev,
  },
} as const

export type ConfigVariables =
  (typeof configVariables)[keyof typeof configVariables]

/**
 * Defines which environment master/main branch deploys to
 * - For production-only repos: set to 'prod'
 * - For repos with staging: set to 'dev'
 * - If set to 'dev' and you need to push hot-fix asap, switch to 'prod'
 * * MODIFY (if needed)
 */
export const MASTER_DEPLOYS_TO_ENV: Env = envName.dev

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
  `${envName.dev}-${envName.test}`,
  `${envName.test}-${envName.pilot}`,
  `${envName.pilot}-${envName.prod}`,
] as const

export const allowedPromotionPathSchema = z.enum(allowedPromotionPath)

export type AllowedPromotionPath = z.infer<typeof allowedPromotionPathSchema>
