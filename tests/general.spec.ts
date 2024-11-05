import { test, expect } from '@playwright/test'
import { route } from '@shared/consts/route'

test('page is accessible', async ({ page }) => {
  const response = await page.goto(route.root)

  expect(response?.status()).toBe(200)
})

test('has title', async ({ page }) => {
  await page.goto(route.root)
  await expect(page).toHaveTitle(/SendMeQuotation.today/u)
})

test('has main elements & texts on index page', async ({ page }) => {
  await page.goto(route.root)

  const mainElement = await page.$('main')

  expect(mainElement).not.toBeNull()

  const navElement = await page.$('nav')

  expect(navElement).not.toBeNull()

  const footerElement = await page.$('footer')

  expect(footerElement).not.toBeNull()

  const body = page.locator('body')

  await expect(body).toHaveText(/Cover letter/u)
  await expect(body).toHaveText(/Title/u)
  await expect(body).toHaveText(/Subtotal/u)
  await expect(body).toHaveText(/Description/u)
  await expect(body).toHaveText(/Item price/u)
  await expect(body).toHaveText(/Qty/u)
  await expect(body).toHaveText(/Price/u)
  await expect(body).toHaveText(/Total price/u)
  await expect(body).toHaveText(/Terms & Conditions/u)
})
