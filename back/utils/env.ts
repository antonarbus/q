// process.env.NODE_ENV is set in package.json scripts

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV !== 'development'
export const env = isDev ? 'dev' : 'prod'

export const portFront = isDev ? 3000 : 3001
export const hostFront = isDev ? 'local.quotation.app' : 'localhost'

export const portBack = isDev ? 4000 : 4001
export const hostBack = 'http://localhost'

export const domain = isProd
  ? 'https://quotation.app'
  : 'https://local.quotation.app:3005'
