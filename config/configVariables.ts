// ==============================================================================
// CONFIGURATION VARIABLES
// ==============================================================================
// Single source of truth for all configuration
// Used to generate .tfvars files and configure deployment scripts
//
// IMPORTANT: After modifying this file, regenerate .tfvars files:
//   bun deploy-scripts/cli.ts generate-tfvars

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

  // Cloud Run Configuration
  minInstances: '0',
  maxInstances: '5',
  cpuLimit: '1',
  memoryLimit: '512Mi',
  containerPortFrontend: '80',
  containerPortBackend: '4000',

  // Cloud SQL Database (MongoDB replacement - for future migration)
  // sqlInstanceName: 'q-mysql',
  // sqlDatabaseVersion: 'MYSQL_8_4',
  // sqlTier: 'db-f1-micro',
  // sqlDiskSize: '10',
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
  maxInstances: '3',
  memoryLimit: '512Mi',
}

export const testConfigVariables = {
  environment: 'test',
  cloudRunServiceNameFrontend: 'q-frontend-test',
  cloudRunServiceNameBackend: 'q-backend-test',
  customDomainFrontend: 'test.sendmequotation.today',
  maxInstances: '3',
  memoryLimit: '512Mi',
}

export const pilotConfigVariables = {
  environment: 'pilot',
  cloudRunServiceNameFrontend: 'q-frontend-pilot',
  cloudRunServiceNameBackend: 'q-backend-pilot',
  customDomainFrontend: 'pilot.sendmequotation.today',
  maxInstances: '5',
  memoryLimit: '512Mi',
}

export const prodConfigVariables = {
  environment: 'prod',
  cloudRunServiceNameFrontend: 'q-frontend-prod',
  cloudRunServiceNameBackend: 'q-backend-prod',
  customDomainFrontend: 'sendmequotation.today',
  maxInstances: '10',
  memoryLimit: '1Gi',
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
