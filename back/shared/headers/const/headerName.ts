/**
 * Set access token to header from clint to avoid
 * checking auth against refresh token for 15 min
 */
export const headerName = {
  accessJwtToken: 'access-jwt-token',
  e2eTest: 'x-e2e-test',
} as const
