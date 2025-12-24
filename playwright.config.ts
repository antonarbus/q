import { defineConfig, devices } from '@playwright/test'
import { runtimeConfig } from '@root/config/runtime'
import { userFilePath } from '@root/tests/setup/userFilePath'

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: runtimeConfig.ci === true, // set at .github/workflows/deployment.yaml:9.
  retries: runtimeConfig.ci === true ? 2 : 0,
  workers: runtimeConfig.ci === true ? 1 : undefined,
  reporter: runtimeConfig.ci === true ? 'dot' : 'line',
  globalSetup: './tests/setup/global.setup.ts',
  use: {
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
  // Only start local servers for local environment
  webServer:
    runtimeConfig.environment === 'local'
      ? [
          {
            command: 'bun run start-back',
            url: runtimeConfig.back.baseUrl,
            ignoreHTTPSErrors: true,
            reuseExistingServer: runtimeConfig.ci === false,
            stdout: 'ignore',
            stderr: 'ignore',
          },
          {
            command: 'bun run start-front',
            url: runtimeConfig.front.baseUrl,
            ignoreHTTPSErrors: true,
            reuseExistingServer: runtimeConfig.ci === false,
          },
        ]
      : undefined,
})
