// process.env.NODE_ENV is set in package.json scripts

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV !== 'development'
export const env = isDev ? 'dev' : 'prod'

export const portFront = 3000
// export const portFront = 3000 : 3001
export const hostFront = isDev ? 'localhost' : 'localhost'

export const portBack = 4000
// export const portBack = isDev ? 4000 : 4001
export const hostBack = 'http://localhost'

export const domain = isProd ? 'https://quotation.app' : 'http://localhost:3000'
