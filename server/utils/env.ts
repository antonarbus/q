export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV !== 'development'
export const env = isDev ? 'dev' : 'prod'
export const domain = isProd
  ? 'https://quotation.app'
  : 'https://local.quotation.app:3005'
