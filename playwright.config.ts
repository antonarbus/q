import { defineConfig, devices } from '@playwright/test'
import { userFilePath } from './tests/setup/userFilePath'
import 'dotenv/config'
import { config } from './back/config'
import { headerName } from './back/shared/headers'
import { env } from './back/shared/lib/dot-env'

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: env.CI === true,
  retries: env.CI === false ? 0 : 2,
  workers: env.CI === false ? undefined : 1,
  reporter: env.CI === false ? 'list' : 'dot',
  use: {
    baseURL: config.front.baseUrl,
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      [headerName.playwrightTest]: 'true',
    },
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
      command: 'bun run start_back',
      url: config.back.baseUrl,
      ignoreHTTPSErrors: true,
      reuseExistingServer: env.CI === false,
      stdout: env.CI === false ? 'pipe' : 'ignore', // Capture standard output
      stderr: env.CI === false ? 'pipe' : 'ignore', // Capture standard error
    },
    {
      command: 'bun run start_front',
      url: config.front.baseUrl,
      ignoreHTTPSErrors: true,
      reuseExistingServer: env.CI === false,
    },
  ],
})
