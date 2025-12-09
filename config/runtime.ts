import { processEnv } from './processEnv'

const DOMAIN = 'sendmequotation.today'

export const runtimeConfig = {
  nodeEnv: processEnv.NODE_ENV,
  ci: processEnv.CI,
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
        return `api-dev.${DOMAIN}`
      }

      if (runtimeConfig.environment === 'test') {
        return `api-test.${DOMAIN}`
      }

      if (runtimeConfig.environment === 'pilot') {
        return `api-pilot.${DOMAIN}`
      }

      if (runtimeConfig.environment === 'prod') {
        return `api.${DOMAIN}`
      }

      // Fallback for unknown environment (build time)
      return 'localhost'
    },
    port: 4000,
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

      return 443 // default, not specified at browser
    },
    portPreview: 3666,
    get baseUrl() {
      return `${this.protocol}://${this.hostname}:${this.port}` as const
    },
    get baseUrlPreview() {
      return `${this.protocol}://${this.hostname}:${this.portPreview}` as const
    },
  },
} as const
