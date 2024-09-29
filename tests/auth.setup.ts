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
    const filePath = path.join(authDir, 'user.json')
    await fs.mkdir(authDir, { recursive: true })
    const authData = await context.storageState({ path: filePath })
  } else {
    throw new Error(`Failed to authenticate: ${response.status()}`)
  }
})
