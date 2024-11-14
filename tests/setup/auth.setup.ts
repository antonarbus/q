import { test as setup, request } from '@playwright/test'
import { userFilePath } from './userFilePath'

setup('authenticate', async () => {
  const context = await request.newContext({
    ignoreHTTPSErrors: true, // This line ignores certificate errors
  })

  const response = await context.post('/api/login', {
    data: {
      email: 'test-user@sendmequotation.today',
      password: 'xxx',
    },
  })

  if (response.ok()) {
    await context.storageState({ path: userFilePath.authenticated })
    console.info('🫡 authenticated before all tests')
  } else {
    const responseBody = await response.text() // Get the response body as text

    throw new Error(
      `Failed to authenticate: ${response.status()} - ${responseBody}`,
    )
  }
})
