// process.env.NODE_ENV is set in package.json scripts

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV !== 'development'
export const env = isDev ? 'dev' : 'prod'

export const portFront = 3000
export const hostFront = 'localhost'

export const portBack = 4000
export const hostBack = 'http://localhost'

export const domain = isProd
  ? 'https://sendmequotation.today'
  : 'https://localhost:3000'
