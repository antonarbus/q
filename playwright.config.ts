import { baseUrlFrontDev } from '@back/utils/env'
import { defineConfig, devices } from '@playwright/test'

// https://playwright.dev/docs/test-configuration

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'dot' : 'list',
  use: {
    baseURL: baseUrlFrontDev,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/u,
      use: {
        launchOptions: {
          args: ['--ignore-certificate-errors'],
        },
      },
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--ignore-certificate-errors'],
        },
        storageState: 'playwright/.auth/authenticated_user.json',
      },
      dependencies: ['setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: 'https://localhost:3000',
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true,
  },
})
