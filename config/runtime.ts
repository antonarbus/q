const getNodeEnv = (): 'development' | 'production' => {
  if (typeof process === 'undefined') return 'development'
  return process.env.NODE_ENV === 'production' ? 'production' : 'development'
}

const getCI = (): boolean => {
  if (typeof process === 'undefined') return false
  return process.env.CI === 'true'
}

export const runtimeConfig = {
  // NODE_ENV=development is set at package.json scripts
  // NODE_ENV=production is set at Dockerfile.prod.front & Dockerfile.prod.back
  nodeEnv: getNodeEnv(),
  ci: getCI(),
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
