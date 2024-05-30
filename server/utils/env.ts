export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV !== 'development'
export const env = isDev ? 'dev' : 'prod'
export const portServer = 3006

export const domainClient = isProd
  ? 'https://quotation.app'
  : 'https://local.quotation.app:3005'
