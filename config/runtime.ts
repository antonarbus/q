import { processEnv } from './processEnv'

export const runtimeConfig = {
  nodeEnv: processEnv.NODE_ENV,
  ci: processEnv.CI,
  environment: processEnv.ENVIRONMENT,
  back: {
    protocol: 'http',
    hostname: 'localhost',
    port: 4000,
    get baseUrl() {
      return `${this.protocol}://${this.hostname}:${this.port}` as const
    },
  },
  front: {
    protocol: 'https',
    get hostname() {
      if (runtimeConfig.nodeEnv === 'development') {
        return 'localhost'
      }

      return 'sendmequotation.today'
    },
    get port() {
      if (runtimeConfig.nodeEnv === 'development') {
        return 3000
      }

      return 443 // default, not specified at browser
    },
    portPreview: 3666,
    get baseUrl() {
      if (runtimeConfig.nodeEnv === 'development') {
        return `${this.protocol}://${this.hostname}:${this.port}` as const
      }

      return `${this.protocol}://${this.hostname}` as const
    },
    get baseUrlPreview() {
      return `${this.protocol}://${this.hostname}:${this.portPreview}` as const
    },
  },
} as const
