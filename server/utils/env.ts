// process.env.NODE_ENV is set in package.json scripts

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV !== 'development'
export const env = isDev ? 'dev' : 'prod'

export const portServer = isDev ? 3006 : 3333
export const hostServer = 'http://localhost'

export const domainClient = isProd
  ? 'https://quotation.app'
  : 'https://local.quotation.app:3005'
