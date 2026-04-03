// oxlint-disable jest/no-conditional-in-test
import { request, test } from '@playwright/test'
import { userFilePath } from './userFilePath'
import { runtimeConfig } from '@root/config/runtime'
import { route } from '@back/api/route'
import { log } from '@tests/shared/utils/log'

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

    if (response.ok()) {
      await context.storageState({ path: userFilePath.authenticated })
      log.info('🫡 authenticated before all tests')
    } else {
      const responseBody = await response.text()
      throw new Error(`Failed to authenticate: ${response.status()} - ${responseBody}`)
    }
  })
})
