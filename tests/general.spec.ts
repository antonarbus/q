import { test, expect } from '@playwright/test'

const url = 'https://localhost:3000'

test('page is accessible', async ({ page }) => {
  const response = await page.goto(url)
  expect(response?.status()).toBe(200)
})

test('has title', async ({ page }) => {
  await page.goto(url)
  await expect(page).toHaveTitle(/SendMeQuotation.today/u)
})

test('has main elements & texts on index page', async ({ page }) => {
  await page.goto(url)

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
  await expect(body).toHaveText(/New/u)
  await expect(body).toHaveText(/Save/u)
  await expect(body).toHaveText(/Pdf/u)
  await expect(body).toHaveText(/Insert/u)
  await expect(body).toHaveText(/Bookmarks/u)
  await expect(body).toHaveText(/Quotations/u)
  await expect(body).toHaveText(/Log in/u)
})

test.only('log in & out', async ({ page }) => {
  const email = 'anton.arbus@gmail.com'
  const password = 'xxx'

  await page.goto(url)

  await page.getByRole('link', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').fill(email)
  await page.getByPlaceholder('Password').fill(password)
  await page.getByRole('button', { name: 'LOG IN' }).click()

  const nav = page.locator('nav')
  await expect(nav).toHaveText(/Profile/u)

  await page.getByRole('link', { name: 'Profile' }).click()
  await page.getByRole('link', { name: 'Log out' }).nth(0).click()

  await expect(nav).toHaveText(/Log in/u)
})
