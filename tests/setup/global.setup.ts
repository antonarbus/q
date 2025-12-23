import { runtimeConfig } from '@root/config/runtime'

export default function globalSetup(): void {
  console.info('\n📝 Playwright test Environment Info:')
  console.info(`   NODE_ENV: ${runtimeConfig.nodeEnv}`)
  console.info(`   ENVIRONMENT: ${runtimeConfig.environment}`)
  console.info(`   CI: ${runtimeConfig.ci}`)
  console.info(`   Backend: ${runtimeConfig.back.baseUrl}`)
  console.info(`   Frontend: ${runtimeConfig.front.baseUrl}\n`)
}
