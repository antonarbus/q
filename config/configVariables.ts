// ==============================================================================
// CONFIGURATION VARIABLES
// ==============================================================================
// Single source of truth for all configuration
// Used to generate .tfvars files and configure deployment scripts
//
// IMPORTANT: After modifying this file, regenerate .tfvars files:
//   bun deploy-scripts/cli.ts generate-tfvars

import { z } from 'zod'

// ==============================================================================
// SHARED CONFIGURATION (applies to all environments)
// ==============================================================================
export const sharedConfigVariables = {
  // Google Cloud Project
  projectId: '<PROJECT_ID>',
  projectNumber: '<PROJECT_NUMBER>',
  region: 'us-central1',

  // GitHub
  githubRepository: '<GITHUB_USER>/<REPO_NAME>',

  // Terraform State
  bucketForTerraformStateName: '<BUCKET_NAME>',

  // Artifact Registry (Docker images)
  artifactRegistryName: 'docker-images',
  dockerImageNameFrontend: 'q-frontend',
  dockerImageNameBackend: 'q-backend',

  // Service Accounts
  githubActionsSaName: 'github-actions-sa',
  cloudRunSaName: 'cloud-run-sa',

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
}

// ==============================================================================
// DEPLOYMENT MODE
// ==============================================================================
// Controls which environment the main/master branch deploys to
// Options: 'prod' | 'dev'
//
// 'prod': Main/master deploys directly to production (single-stage workflow)
// 'dev': Main/master deploys to dev, use promotion workflow for test → pilot → prod
export const MASTER_DEPLOYS_TO_ENV: 'prod' | 'dev' = 'dev'

// ==============================================================================
// ENVIRONMENT-SPECIFIC CONFIGURATION
// ==============================================================================

export const devConfigVariables = {
  environment: 'dev',
  cloudRunServiceNameFrontend: 'q-frontend-dev',
  cloudRunServiceNameBackend: 'q-backend-dev',
  customDomainFrontend: 'dev.sendmequotation.today',
  // Backend typically doesn't need custom domain, accessed via frontend
  maxInstancesFrontend: '3',
  maxInstancesBackend: '3',
  memoryLimitFrontend: '512Mi',
  memoryLimitBackend: '512Mi',
}

export const testConfigVariables = {
  environment: 'test',
  cloudRunServiceNameFrontend: 'q-frontend-test',
  cloudRunServiceNameBackend: 'q-backend-test',
  customDomainFrontend: 'test.sendmequotation.today',
  maxInstancesFrontend: '3',
  maxInstancesBackend: '3',
  memoryLimitFrontend: '512Mi',
  memoryLimitBackend: '512Mi',
}

export const pilotConfigVariables = {
  environment: 'pilot',
  cloudRunServiceNameFrontend: 'q-frontend-pilot',
  cloudRunServiceNameBackend: 'q-backend-pilot',
  customDomainFrontend: 'pilot.sendmequotation.today',
  maxInstancesFrontend: '5',
  maxInstancesBackend: '5',
  memoryLimitFrontend: '512Mi',
  memoryLimitBackend: '512Mi',
}

export const prodConfigVariables = {
  environment: 'prod',
  cloudRunServiceNameFrontend: 'q-frontend-prod',
  cloudRunServiceNameBackend: 'q-backend-prod',
  customDomainFrontend: 'sendmequotation.today',
  maxInstancesFrontend: '10',
  maxInstancesBackend: '10',
  memoryLimitFrontend: '1Gi',
  memoryLimitBackend: '1Gi',
}

// ==============================================================================
// ENVIRONMENT CONFIGURATION MAP
// ==============================================================================
export const environmentConfigMap = {
  dev: devConfigVariables,
  test: testConfigVariables,
  pilot: pilotConfigVariables,
  prod: prodConfigVariables,
}

// ==============================================================================
// FULL CONFIGURATION BUILDER
// ==============================================================================
export function getFullConfig(env: keyof typeof environmentConfigMap) {
  return {
    ...sharedConfigVariables,
    ...environmentConfigMap[env],
  }
}

// Type for the full configuration
export type FullConfig = ReturnType<typeof getFullConfig>

// ==============================================================================
// CONFIGURATION VALIDATION
// ==============================================================================
export const envSchema = z.enum(['dev', 'test', 'pilot', 'prod'])
export type Env = z.infer<typeof envSchema>

// ==============================================================================
// CONFIG EXPORT FOR DEPLOY SCRIPTS
// ==============================================================================
export const configVariables = {
  dev: getFullConfig('dev'),
  test: getFullConfig('test'),
  pilot: getFullConfig('pilot'),
  prod: getFullConfig('prod'),
}
