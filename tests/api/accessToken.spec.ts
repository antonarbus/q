/* eslint-disable */
// @ts-nocheck

import { config } from '@back/config'
import { api } from '@back/api'
import { connectToDb } from '@back/shared/lib/mongoose/connectToDb'
import { test, expect } from '@playwright/test'

test.describe.configure({ mode: 'serial' })

test.describe('#authTokenRefresh', () => {
  // test.beforeAll(async () => {
  //   await connectToDb()
  // })

  test.use({ baseURL: config.back.baseUrl })

  const email = 'test-user@sendmequotation.today'
  const password = 'xxx'

  test('get access token based on refresh token', async ({ request }) => {
    // Log in to get access and refresh tokens
    const loginResponse = await request[api.logIn.method](api.logIn.url, {
      data: { email, password },
    })

    expect(loginResponse.ok()).toBeTruthy()
    const loginData = await loginResponse.json()
    expect(loginData.accessJwtToken).toBeTruthy()
    const accessToken = loginData.accessJwtToken

    // Make a protected request with valid access token
    let res = await request[api.getQuotationList.method](
      api.getQuotationList.url,
      {
        headers: {
          'access-jwt-token': accessToken,
        },
      },
    )

    expect(res.ok()).toBeTruthy()

    // Simulate access token expiration by using an invalid token
    res = await request[api.getQuotationList.method](api.getQuotationList.url, {
      headers: {
        'access-jwt-token': 'invalid token value',
      },
    })

    expect(res.status()).toBe(401)

    // Get new access token using refresh token (from cookie)
    const accessTokenResponse = await request[api.getAccessToken.method](
      api.getAccessToken.url,
    )

    expect(accessTokenResponse.ok()).toBeTruthy()
    const accessTokenData = await accessTokenResponse.json()
    expect(accessTokenData.accessJwtToken).toBeTruthy()
    const newAccessToken = accessTokenData.accessJwtToken

    // Retry the protected request with the new access token
    res = await request[api.getQuotationList.method](api.getQuotationList.url, {
      headers: {
        'access-jwt-token': newAccessToken,
      },
    })

    expect(res.ok()).toBeTruthy()
  })
})
