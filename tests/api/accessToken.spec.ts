// @ts-nocheck

import { api } from '@back/api'
import { config } from '@back/config'
import { expect, test } from '@playwright/test'

test.describe.configure({ mode: 'serial' })

test.describe('#authTokenRefresh', () => {
  test.use({ baseURL: config.back.baseUrl })

  const email = 'test-user@sendmequotation.today'
  const password = 'xxx'
  let accessToken: string
  let refreshCookies: string[]

  test.describe('Step 1: Login and get tokens', () => {
    test('should login successfully and return access token', async ({
      request,
    }) => {
      const loginResponse = await request[api.logIn.method](api.logIn.url, {
        data: { email, password },
      })

      expect(loginResponse.ok()).toBeTruthy()
      const loginData = await loginResponse.json()
      expect(loginData.accessJwtToken).toBeTruthy()

      accessToken = loginData.accessJwtToken
      refreshCookies = loginResponse.headers()['set-cookie'] || []
    })
  })

  test.describe('Step 2: Test valid access token', () => {
    test('should make successful protected request with valid token', async ({
      request,
    }) => {
      const res = await request[api.getQuotationList.method](
        api.getQuotationList.url,
        {
          headers: {
            'access-jwt-token': accessToken,
          },
        },
      )

      expect(res.ok()).toBeTruthy()
    })
  })

  test.describe('Step 3: Test invalid access token', () => {
    test('should return 401 with invalid token', async ({ request }) => {
      const res = await request[api.getQuotationList.method](
        api.getQuotationList.url,
        {
          headers: {
            'access-jwt-token': 'invalid token value',
          },
        },
      )

      expect(res.status()).toBe(401)
    })
  })

  test.describe('Step 4: Refresh token endpoint', () => {
    test('should get new access token using refresh token from cookie', async ({
      request,
    }) => {
      const accessTokenResponse = await request[api.getAccessToken.method](
        api.getAccessToken.url,
      )

      expect(accessTokenResponse.ok()).toBeTruthy()
      const accessTokenData = await accessTokenResponse.json()
      expect(accessTokenData.accessJwtToken).toBeTruthy()

      accessToken = accessTokenData.accessJwtToken
    })
  })

  test.describe('Step 5: Test refreshed access token', () => {
    test('should make successful protected request with refreshed token', async ({
      request,
    }) => {
      const res = await request[api.getQuotationList.method](
        api.getQuotationList.url,
        {
          headers: {
            'access-jwt-token': accessToken,
          },
        },
      )

      expect(res.ok()).toBeTruthy()
    })
  })
})
