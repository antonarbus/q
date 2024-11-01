export const config = {
  isDev: process.env.NODE_ENV === 'development', // set at package.json
  isProd: process.env.NODE_ENV !== 'development',
  get env() {
    return this.isDev ? 'dev' : 'prod'
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
    dev: {
      protocol: 'https',
      hostname: 'localhost',
      port: 3000,
      get baseUrl() {
        return `${this.protocol}://${this.hostname}:${this.port}` as const
      },
    },
    prod: {
      protocol: 'https',
      hostname: 'sendmequotation.today',
      port: 443, // default
      get baseUrl() {
        return `${this.protocol}://${this.hostname}` as const
      },
    },
    get baseUrl() {
      return this[config.env].baseUrl
    },
  },
} as const
