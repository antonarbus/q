export const tokenExpirationMinutes = (token: string) => {
  const exp = (JSON.parse(window.atob(token.split('.')[1]))).exp // in seconds since 01 January 1970 GMT
  const d = new Date('1970-01-01T00:00:00Z') // Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)
  const expiration = d.setUTCSeconds(exp) // 1663584953000 //the value of 'exp', note use UTC not setSeconds().
  const now = new Date().valueOf()
  const difference = expiration - now
  const oneMin = 1 * 60 * 1000
  const expirationInMin = difference / oneMin
  return expirationInMin
}
