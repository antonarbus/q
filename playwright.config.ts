import { defineConfig, devices } from '@playwright/test'
import { baseUrlBack, baseUrlFrontDev } from './back/utils/env'
import { userFilePath } from 'tests/setup/userFilePath'
import 'dotenv/config'

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
    // https://playwright.dev/docs/auth#authenticate-with-api-request
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
        storageState: userFilePath.authenticated,
      },
      dependencies: ['setup'],
    },
  ],
  // https://playwright.dev/docs/test-webserver
  webServer: [
    {
      command: 'npm run start_back',
      url: baseUrlBack,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
      // stdout: process.env.CI ? 'ignore' : 'pipe', // Capture standard output
      // stderr: process.env.CI ? 'ignore' : 'pipe', // Capture standard error
    },
    {
      command: 'npm run start_front',
      url: baseUrlFrontDev,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !process.env.CI,
    },
  ],
})
