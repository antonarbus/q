import { defineConfig, devices } from '@playwright/test'
import { userFilePath } from 'tests/setup/userFilePath'
import 'dotenv/config'
import { config } from './back/config'
import { getEnvVar } from '@back/utils/getEnvVar'

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(getEnvVar('CI')),
  retries: getEnvVar('CI') ? 2 : 0,
  workers: getEnvVar('CI') ? 1 : undefined,
  reporter: getEnvVar('CI') ? 'dot' : 'list',
  use: {
    baseURL: config.front.baseUrl,
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
      url: config.back.baseUrl,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !getEnvVar('CI'),
      stdout: getEnvVar('CI') ? 'ignore' : 'pipe', // Capture standard output
      stderr: getEnvVar('CI') ? 'ignore' : 'pipe', // Capture standard error
    },
    {
      command: 'npm run start_front',
      url: config.front.baseUrl,
      ignoreHTTPSErrors: true,
      reuseExistingServer: !getEnvVar('CI'),
    },
  ],
})
