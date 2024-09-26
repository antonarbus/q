import { test, expect } from '@playwright/test'
import { route } from '@shared/consts/route'

test('log in & out', async ({ page }) => {
  const email = 'anton.arbus@gmail.com'
  const password = 'xxx'

  await page.goto(route.root)
  await page.getByRole('link', { name: 'Log in' }).click()
  const button = page.locator('button').filter({ hasText: /LOG IN/u })
  await expect(button).toBeDisabled()
  await page.getByPlaceholder('Email').focus()
  await page.getByPlaceholder('Email').fill(email)
  await page.getByPlaceholder('Password').focus()
  await page.getByPlaceholder('Password').fill(password)
  await expect(button).not.toBeDisabled()
  await button.click()
  const nav = page.locator('nav')
  await expect(nav).toHaveText(/Profile/u)
  await page.getByRole('link', { name: 'Profile' }).click()
  await page.getByRole('link', { name: 'Log out' }).nth(0).click()
  await expect(nav).toHaveText(/Log in/u)
})
