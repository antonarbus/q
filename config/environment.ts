import { z } from 'zod'

/**
 * Environment configuration types and constants
 *
 * We distinguish between two contexts:
 * 1. Deployed environments - Infrastructure/deployment targets (dev, test, pilot, prod)
 * 2. Runtime environments - All possible runtime contexts including build time and local dev
 */

//* DO NOT MODIFY, does not hurt.

/**
 * Deployed environments - used by infrastructure and deployment scripts
 * These are the actual Cloud Run deployment targets
 */
const deployedEnvironmentList = ['dev', 'test', 'pilot', 'prod'] as const
export const deployedEnvironmentSchema = z.enum(deployedEnvironmentList)
export type DeployedEnvironment = z.infer<typeof deployedEnvironmentSchema>

/**
 * Runtime environments - includes all possible runtime contexts
 * - 'unknown': Build time (Docker images built without knowing target environment)
 * - 'local': Local development (localhost URLs, http protocol, different ports)
 * - Deployed environments: Set by Cloud Run via --set-env-vars
 */
const runtimeEnvironmentList = [
  // 'unknown' is essentially a placeholder that says: "I need to provide some value during the build, but it
  // doesn't actually matter because the real value gets set at deployment time."
  'unknown',
  // 'local' is set at package.json scripts to run server locally
  'local',
  ...deployedEnvironmentList,
] as const

export const runtimeEnvironmentSchema = z.enum(runtimeEnvironmentList)
// export type RuntimeEnv = z.infer<typeof runtimeEnvSchema>
