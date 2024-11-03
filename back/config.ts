import { getEnvVar } from './utils/getEnvVar'

export const config = {
  get env() {
    if (getEnvVar('NODE_ENV') === 'dev') return 'dev'
    if (getEnvVar('NODE_ENV') === 'ci') return 'ci'
    return 'prod'
  },
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
      if (config.env === 'dev') return 'localhost'
      if (config.env === 'ci') return 'localhost'
      return 'sendmequotation.today'
    },
    get port() {
      if (config.env === 'dev') return 3000
      if (config.env === 'ci') return 3000
      return 443 // default, not specified at browser
    },
    get baseUrl() {
      if (config.env === 'dev')
        return `${this.protocol}://${this.hostname}:${this.port}` as const

      if (config.env === 'ci')
        return `${this.protocol}://${this.hostname}:${this.port}` as const

      return `${this.protocol}://${this.hostname}` as const
    },
  },
} as const
