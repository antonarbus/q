import { test, expect } from '@playwright/test'

test('check if webpage is accessible', async ({ page }) => {
  const url = 'https://localhost:3000'

  const response = await page.goto(url)
  expect(response?.status()).toBe(200)

  const title = await page.title()
  expect(title).toBe(
    'SendMeQuotation.today - Build and Manage Your Commercial Quotations',
  )

  const mainElement = await page.$('main')
  expect(mainElement).not.toBeNull()
})
