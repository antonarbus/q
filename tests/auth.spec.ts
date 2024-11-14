import { test, expect } from '@playwright/test'
import { route } from '@shared/consts/route'
import { userFilePath } from './setup/userFilePath'

test.describe('nav bar for logged-in vs guest user', () => {
  test.use({ storageState: userFilePath.guest })

  test('log in & out', async ({ page }) => {
    const email = 'test-user@sendmequotation.today'
    const password = 'xxx'

    await page.goto(route.root)

    const nav = page.locator('nav')

    // at the start we check tokens are spinner is rotating
    // which blocks the click on login button
    // so we should wait until spinner is removed
    const spinner = nav.locator('[data-testid="spinner icon"]')
    await spinner.waitFor({ state: 'hidden' })

    await page.getByRole('link', { name: 'Log in' }).click()
    const button = page.locator('button').filter({ hasText: 'LOG IN' })

    await expect(button).toBeDisabled()
    await page.getByPlaceholder('Email').focus()
    await page.getByPlaceholder('Email').fill(email)
    await page.getByPlaceholder('Password').focus()
    await page.getByPlaceholder('Password').fill(password)
    await expect(button).not.toBeDisabled()
    await button.click()

    await expect(nav).toHaveText(/Profile/u)
    await page.getByRole('link', { name: 'Profile' }).click()
    await page.getByRole('link', { name: 'Log out' }).nth(0).click()
    await expect(nav).toHaveText(/Log in/u)
  })
})
