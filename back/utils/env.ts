// process.env.NODE_ENV is set in package.json scripts

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV !== 'development'
export const env = isDev ? 'dev' : 'prod'

const protocolFront = 'https'
export const hostnameFrontDev = 'localhost' // 'local.sendmequotation.today'
const hostnameFrontProd = 'sendmequotation.today'
export const portFront = 3000
export const baseUrlFrontDev = `${protocolFront}://${hostnameFrontDev}:${portFront}`
const baseUrlFrontProd = `${protocolFront}://${hostnameFrontProd}`
export const baseUrlFront = isProd ? baseUrlFrontProd : baseUrlFrontDev

const protocolBack = 'http'
const hostnameBack = 'localhost'
export const portBack = 4000
export const baseUrlBack = `${protocolBack}://${hostnameBack}:${portBack}`
