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
  forbidOnly: env.CI === true, // set at .github/workflows/deployment.yaml:9.
  retries: env.CI === true ? 2 : 0,
  workers: env.CI === true ? 1 : undefined,
  reporter: env.CI === true ? 'dot' : 'list',
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
      command: 'bun run start-back',
      url: config.back.baseUrl,
      ignoreHTTPSErrors: true,
      reuseExistingServer: env.CI === false,
      stdout: env.CI === true ? 'ignore' : 'pipe', // Capture standard output
      stderr: env.CI === true ? 'ignore' : 'pipe', // Capture standard error
    },
    {
      command: 'bun run start-front',
      url: config.front.baseUrl,
      ignoreHTTPSErrors: true,
      reuseExistingServer: env.CI === false,
    },
  ],
})
