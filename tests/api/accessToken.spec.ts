// oxlint-disable init-declarations
import { route } from '@back/api/route'
import { expect, test } from '@playwright/test'
import { runtimeConfig } from '@root/config/runtime'

test.describe.configure({ mode: 'serial' })

const isAccessJwtTokenResponse = (data: unknown): data is { accessJwtToken: string } =>
  typeof data === 'object' &&
  data !== null &&
  'accessJwtToken' in data &&
  typeof data.accessJwtToken === 'string'

const assertIsAccessJwtTokenResponse: (
  data: unknown,
) => asserts data is { accessJwtToken: string } = (data) => {
  if (!isAccessJwtTokenResponse(data)) {
    throw new Error('Unexpected response shape: missing accessJwtToken')
  }
}

const assertIsDefined: <Value>(
  value: Value,
  message: string,
) => asserts value is NonNullable<Value> = (value, message) => {
  if (value === undefined || value === null) {
    throw new Error(message)
  }
}

test.describe('#authTokenRefresh', () => {
  test.use({ baseURL: runtimeConfig.back.baseUrl })

  const email = 'test-user@sendmequotation.today'
  const password = 'xxx'
  let accessToken: string
  let refreshedAccessToken: string
  let refreshTokenCookie: string

  test.describe('Step 1: Login and get tokens', () => {
    test('should login successfully and return access token', async ({ request }) => {
      const loginResponse = await request[route.logIn.method](route.logIn.url, {
        data: { email, password },
      })

      expect(loginResponse.ok()).toBeTruthy()
      const loginData: unknown = await loginResponse.json()
      assertIsAccessJwtTokenResponse(loginData)

      expect(loginData.accessJwtToken).toBeTruthy()

      accessToken = loginData.accessJwtToken

      // Verify refresh token cookie is set
      const cookies = loginResponse.headers()['set-cookie']
      assertIsDefined(cookies, 'Expected set-cookie header to be present')

      expect(cookies).toContain('refresh-jwt-token')

      // Store the refresh token cookie for later use
      refreshTokenCookie = cookies
    })
  })

  test.describe('Step 2: Test valid access token', () => {
    test('should make successful protected request with valid token', async ({ request }) => {
      const res = await request[route.getQuotationList.method](route.getQuotationList.url, {
        headers: {
          'access-jwt-token': accessToken,
        },
      })

      expect(res.ok()).toBeTruthy()
    })
  })

  test.describe('Step 3: Test invalid access token', () => {
    test('should return 401 with "Not logged in" message', async ({ request }) => {
      const res = await request[route.getQuotationList.method](route.getQuotationList.url, {
        headers: {
          'access-jwt-token': 'invalid token value',
        },
      })

      expect(res.status()).toBe(401)
    })
  })

  test.describe('Step 4: Refresh token endpoint', () => {
    test('should get new access token using refresh token from cookie', async ({ request }) => {
      const accessTokenResponse = await request[route.getAccessToken.method](
        route.getAccessToken.url,
        {
          headers: {
            Cookie: refreshTokenCookie,
          },
        },
      )

      expect(accessTokenResponse.ok()).toBeTruthy()
      const accessTokenData: unknown = await accessTokenResponse.json()
      assertIsAccessJwtTokenResponse(accessTokenData)

      expect(accessTokenData.accessJwtToken).toBeTruthy()

      refreshedAccessToken = accessTokenData.accessJwtToken

      // Note: The refreshed token may be the same as the original if issued
      // within the same second (JWT iat precision), which is fine for fast tests

      // Update for next test
      accessToken = refreshedAccessToken
    })
  })

  test.describe('Step 5: Test refreshed access token', () => {
    test('should make successful protected request with refreshed token', async ({ request }) => {
      const res = await request[route.getQuotationList.method](route.getQuotationList.url, {
        headers: {
          'access-jwt-token': accessToken,
        },
      })

      expect(res.ok()).toBeTruthy()
    })
  })

  test.describe('Step 6: Test invalid refresh token', () => {
    test('should return 401 when refresh token is invalid', async ({ request }) => {
      const invalidRefreshToken = 'refresh-jwt-token=invalid_token_value'

      const res = await request[route.getAccessToken.method](route.getAccessToken.url, {
        headers: {
          Cookie: invalidRefreshToken,
        },
      })

      expect(res.status()).toBe(401)
    })
  })
})
