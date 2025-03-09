/**
 * Set access token to header from clint to avoid
 * checking auth against refresh token for 15 min
 */
export const headerName = {
  accessJwtToken: 'access-jwt-token',
  email: 'email', // todo: not in use
} as const

/**
 * Set data into cookies from server for all domain http requests
 * from front to back ends. Data can not be manipulated with JS on
 * front end
 */
export const cookieName = {
  noTrace: 'no-trace',
  refreshJwtToken: 'refresh-jwt-token',
} as const
