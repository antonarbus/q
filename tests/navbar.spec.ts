import { test, expect } from '@playwright/test'
import { route } from '@shared/consts/route'
import { userFilePath } from './setup/userFilePath'

test.beforeEach(async ({ page }) => {
  await page.goto(route.root)
})

test.describe('nav icons & text on wide screen', () => {
  test.use({ storageState: userFilePath.authenticated })
  test.use({ viewport: { width: 1600, height: 1200 } })

  test('should show icons & text', async ({ page }) => {
    // page.on('request', (request) => {
    //   if (request.url().includes('count-unique-daily-visitors')) {
    //     console.log('url', request.url())
    //     console.log('headers', request.headers())
    //   }
    // })

    const nav = page.locator('nav')

    await expect(nav.locator('[data-testid="new icon"]')).toBeVisible()
    await expect(nav).toHaveText(/New/u)
    await expect(nav.locator('[data-testid="save icon"]')).toBeVisible()
    await expect(nav).toHaveText(/Save/u)
    await expect(nav.locator('[data-testid="share icon"]')).toBeVisible()
    await expect(nav).toHaveText(/Share/u)
    await expect(nav.locator('[data-testid="insert icon"]')).toBeVisible()
    await expect(nav).toHaveText(/Insert/u)
    await expect(nav.locator('[data-testid="bookmarks icon"]')).toBeVisible()
    await expect(nav).toHaveText(/Bookmarks/u)
    await expect(nav.locator('[data-testid="quotations icon"]')).toBeVisible()
    await expect(nav).toHaveText(/Quotations/u)

    const spinner = nav.locator('[data-testid="spinner icon"]')
    await spinner.waitFor({ state: 'hidden' })

    await expect(nav.locator('[data-testid="profile icon"]')).toBeVisible()
    await expect(nav).toHaveText(/Profile/u)

    await expect(
      nav.locator('[data-testid="hamburger icon"]'),
    ).not.toBeVisible()
  })
})

test.describe('nav icons for guest user', () => {
  test.use({ viewport: { width: 1600, height: 1200 } })
  test.use({ storageState: userFilePath.guest })

  test('should show icons & text', async ({ page }) => {
    const nav = page.locator('nav')

    await expect(nav.locator('[data-testid="login icon"]')).toBeVisible()
    await expect(nav).toHaveText(/Log in/u)
    await expect(nav.locator('[data-testid="profile icon"]')).not.toBeVisible()
    await expect(nav).not.toHaveText(/Profile/u)
  })
})

test.describe('nav icons & text on super narrow screen', () => {
  test.use({ viewport: { width: 500, height: 1200 } })

  test('should show only hamburger icon', async ({ page }) => {
    const nav = page.locator('nav')

    await expect(nav.locator('[data-testid="new icon"]')).not.toBeVisible()
    await expect(nav.locator('text=New')).not.toBeVisible()
    await expect(nav.locator('[data-testid="save icon"]')).not.toBeVisible()
    await expect(nav.locator('text=Save')).not.toBeVisible()
    await expect(nav.locator('[data-testid="pdf icon"]')).not.toBeVisible()
    await expect(nav.locator('text=Pdf')).not.toBeVisible()
    await expect(nav.locator('[data-testid="insert icon"]')).not.toBeVisible()
    await expect(nav.locator('text=Insert')).not.toBeVisible()

    await expect(
      nav.locator('[data-testid="bookmarks icon"]'),
    ).not.toBeVisible()

    await expect(nav.locator('text=Bookmarks')).not.toBeVisible()

    await expect(
      nav.locator('[data-testid="quotations icon"]'),
    ).not.toBeVisible()

    await expect(nav.locator('text=Quotations')).not.toBeVisible()
    await expect(nav.locator('[data-testid="login icon"]')).not.toBeVisible()
    await expect(nav.locator('text=Log in')).not.toBeVisible()

    await expect(nav.locator('[data-testid="hamburger icon"]')).toBeVisible()
  })
})
