import { defineConfig, devices } from '@playwright/test'
import { userFilePath } from 'tests/setup/userFilePath'
import 'dotenv/config'
import { headerName } from '@back/shared/headers'
import { getEnvVar } from '@back/shared/lib/dot-env'
import { config } from './back/config'

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(getEnvVar('CI')),
  retries: getEnvVar('CI') === undefined ? 0 : 2,
  workers: getEnvVar('CI') === undefined ? undefined : 1,
  reporter: getEnvVar('CI') === undefined ? 'list' : 'dot',
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
      command: 'npm run start_back',
      url: config.back.baseUrl,
      ignoreHTTPSErrors: true,
      reuseExistingServer: getEnvVar('CI') === undefined,
      stdout: getEnvVar('CI') === undefined ? 'pipe' : 'ignore', // Capture standard output
      stderr: getEnvVar('CI') === undefined ? 'pipe' : 'ignore', // Capture standard error
    },
    {
      command: 'npm run start_front',
      url: config.front.baseUrl,
      ignoreHTTPSErrors: true,
      reuseExistingServer: getEnvVar('CI') === undefined,
    },
  ],
})
