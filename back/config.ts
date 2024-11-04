import { getEnvVar } from './utils/getEnvVar'

export const config = {
  get env() {
    if (getEnvVar('NODE_ENV') === 'development') return 'development'
    return 'production'
  },
  get installation() {
    if (getEnvVar('INSTALLATION') === 'local') return 'local'
    return 'production'
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
      if (config.installation === 'local') return 'localhost'
      return 'sendmequotation.today'
    },
    get port() {
      if (config.installation === 'local') return 3000
      return 443 // default, not specified at browser
    },
    get baseUrl() {
      if (config.installation === 'local')
        return `${this.protocol}://${this.hostname}:${this.port}` as const

      return `${this.protocol}://${this.hostname}` as const
    },
  },
} as const
