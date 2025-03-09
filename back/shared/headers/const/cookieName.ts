/**
 * Set data into cookies from server for all domain http requests
 * from front to back ends. Data can not be manipulated with JS on
 * front end
 */
export const cookieName = {
  noTrace: 'no-trace',
  refreshJwtToken: 'refresh-jwt-token',
} as const
