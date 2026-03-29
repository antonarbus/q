import { DOMAIN } from './domain'
import { processEnv } from './processEnv'

export const runtimeConfig = {
  nodeEnv: processEnv.NODE_ENV,
  ci: processEnv.CI,
  // Runtime environment includes 'unknown' (build time) and 'local' (local dev)
  // in addition to deployed environments (dev/test/pilot/prod).
  // See config/environment.ts for the distinction between RuntimeEnv and DeployedEnv.
  environment: processEnv.ENVIRONMENT,
  back: {
    get protocol() {
      // Local development uses http
      if (runtimeConfig.environment === 'local') {
        return 'http'
      }

      // Deployed environments use https
      return 'https'
    },
    get hostname() {
      if (runtimeConfig.environment === 'local') {
        return 'localhost'
      }

      if (runtimeConfig.environment === 'dev') {
        return `dev.${DOMAIN}`
      }

      if (runtimeConfig.environment === 'test') {
        return `test.${DOMAIN}`
      }

      if (runtimeConfig.environment === 'pilot') {
        return `pilot.${DOMAIN}`
      }

      if (runtimeConfig.environment === 'prod') {
        return DOMAIN
      }

      // Fallback for unknown environment (build time)
      return 'localhost'
    },
    port: 8080,
    get baseUrl() {
      if (runtimeConfig.environment === 'local') {
        return `${this.protocol}://${this.hostname}:${this.port}` as const
      }

      return `${this.protocol}://${this.hostname}` as const
    },
  },
  front: {
    protocol: 'https',
    get hostname() {
      if (runtimeConfig.environment === 'local') {
        return 'localhost'
      }

      if (runtimeConfig.environment === 'dev') {
        return `dev.${DOMAIN}`
      }

      if (runtimeConfig.environment === 'test') {
        return `test.${DOMAIN}`
      }

      if (runtimeConfig.environment === 'pilot') {
        return `pilot.${DOMAIN}`
      }

      if (runtimeConfig.environment === 'prod') {
        return DOMAIN
      }

      // Fallback for unknown environment (build time)
      return 'localhost'
    },
    get port() {
      if (runtimeConfig.environment === 'local') {
        return 3000
      }

      // default, not specified at browser
      return 443
    },
    portPreview: 3666,
    get baseUrl() {
      if (runtimeConfig.environment === 'local') {
        return `${this.protocol}://${this.hostname}:${this.port}` as const
      }

      return `${this.protocol}://${this.hostname}` as const
    },
    get baseUrlPreview() {
      return `${this.protocol}://${this.hostname}:${this.portPreview}` as const
    },
  },
} as const
