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
const DEPLOYED_ENVS = ['dev', 'test', 'pilot', 'prod'] as const
export const deployedEnvSchema = z.enum(DEPLOYED_ENVS)
export type DeployedEnv = z.infer<typeof deployedEnvSchema>

/**
 * Runtime environments - includes all possible runtime contexts
 * - 'unknown': Build time (Docker images built without knowing target environment)
 * - 'local': Local development (localhost URLs, http protocol, different ports)
 * - Deployed environments: Set by Cloud Run via --set-env-vars
 */
const RUNTIME_ENVS = [
  // 'unknown' is essentially a placeholder that says: "I need to provide some value during the build, but it
  // doesn't actually matter because the real value gets set at deployment time."
  'unknown',
  // 'local' is set at package.json scripts to run server locally
  'local',
  ...DEPLOYED_ENVS,
] as const

export const runtimeEnvSchema = z.enum(RUNTIME_ENVS)
// export type RuntimeEnv = z.infer<typeof runtimeEnvSchema>
