import { test as setup, request } from '@playwright/test'
import fs from 'fs/promises'
import path from 'path'

setup('authenticate', async () => {
  const context = await request.newContext({
    ignoreHTTPSErrors: true, // This line ignores certificate errors
  })

  const response = await context.post('/api/login', {
    data: {
      email: 'anton.arbus@gmail.com',
      password: 'xxx',
    },
  })

  if (response.ok()) {
    const authDir = path.resolve('playwright', '.auth')
    const filePath = path.join(authDir, 'authenticated_user.json')
    await fs.mkdir(authDir, { recursive: true })
    await context.storageState({ path: filePath })
  } else {
    const responseBody = await response.text() // Get the response body as text
    throw new Error(
      `Failed to authenticate: ${response.status()} - ${responseBody}`,
    )
  }
})
