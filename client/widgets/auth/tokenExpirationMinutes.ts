import type { JwtPayload } from 'jwt-decode'

export const tokenExpirationMinutes = (token: string): number => {
  const jwtPayloadHashed = token.split('.')[1]
  if (!jwtPayloadHashed) return 0
  // atob() decodes Base64 decoded string
  const jwtPayloadDecodedIntoJson = window.atob(jwtPayloadHashed)
  const jwtPayload = JSON.parse(jwtPayloadDecodedIntoJson) as JwtPayload
  const { exp } = jwtPayload // in seconds since 01.01.1970 GMT
  if (!exp) return 0
  const d = new Date('1970-01-01T00:00:00Z') // Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)
  const expiration = d.setUTCSeconds(exp) // 1663584953000 //the value of 'exp', note use UTC not setSeconds().
  const now = new Date().valueOf()
  const difference = expiration - now
  const oneMin = 1 * 60 * 1000
  const expirationInMin = difference / oneMin
  return expirationInMin
}
