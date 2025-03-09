/**
 * Set access token to header from clint to avoid
 * checking auth against refresh token for 15 min
 */
export const headerName = {
  accessJwtToken: 'access-jwt-token',
  playwrightTest: 'playwright-test',
} as const
