// process.env.NODE_ENV is set in package.json scripts

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV !== 'development'
export const env = isDev ? 'dev' : 'prod'

export const portFront = isDev ? 3005 : 3006
export const hostFront = isDev ? 'local.quotation.app' : 'localhost'

export const portBack = isDev ? 3006 : 4006
export const hostBack = 'http://localhost'

export const domainClient = isProd
  ? 'https://quotation.app'
  : 'https://local.quotation.app:3005'
