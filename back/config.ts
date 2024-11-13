import { getEnvVar } from './utils/getEnvVar'

export const config = {
  get env() {
    // https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production#why-is-node_env-considered-an-antipattern
    // NODE_ENV usage is anti-pattern
    // we set NODE_ENV=development at package.json & Dockerfile.prod & deployment.yaml when launch a server
    // we set NODE_ENV only for potential usage by other packages for their own reasons

    if (getEnvVar('NODE_ENV') === 'development') {
      return 'development'
    }

    return 'production'
  },
  get installation() {
    // our code logic is not dependent on NODE_ENV, but on INSTALLATION env variable
    // INSTALLATION is also set at package.json & Dockerfile.prod & deployment.yaml

    if (getEnvVar('INSTALLATION') === 'local') {
      return 'local'
    }

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
      if (config.installation === 'local') {
        return 'localhost'
      }

      return 'sendmequotation.today'
    },
    get port() {
      if (config.installation === 'local') {
        return 3000
      }

      return 443 // default, not specified at browser
    },
    get baseUrl() {
      if (config.installation === 'local') {
        return `${this.protocol}://${this.hostname}:${this.port}` as const
      }

      return `${this.protocol}://${this.hostname}` as const
    },
  },
} as const
