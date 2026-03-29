import { request, test } from '@playwright/test'
import { userFilePath } from './userFilePath'
import { runtimeConfig } from '@root/config/runtime'
import { route } from '@back/api/route'

test.describe('authenticate for all further tests', () => {
  test.use({ baseURL: runtimeConfig.front.baseUrl })

  test('authenticate', async () => {
    const context = await request.newContext({
      // This line ignores certificate errors
      ignoreHTTPSErrors: true,
    })

    const response = await context.post(route.logIn.url, {
      data: {
        email: 'test-user@sendmequotation.today',
        password: 'xxx',
      },
    })

    const isResponseOk = response.ok()

    if (isResponseOk === true) {
      await context.storageState({ path: userFilePath.authenticated })
      console.info('🫡 authenticated before all tests')
    } else {
      // Get the response body as text
      const responseBody = await response.text()

      throw new Error(`Failed to authenticate: ${response.status()} - ${responseBody}`)
    }
  })
})
