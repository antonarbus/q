const isDev = process.env.NODE_ENV === 'development' // defined at package.json

export const config = {
  env: isDev ? 'dev' : 'prod',
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
      if (isDev) return 'localhost'
      return 'sendmequotation.today'
    },
    get port() {
      if (isDev) return 3000
      return 443 // default, not specified at browser
    },
    get baseUrl() {
      if (isDev)
        return `${this.protocol}://${this.hostname}:${this.port}` as const
      return `${this.protocol}://${this.hostname}` as const
    },
  },
} as const
