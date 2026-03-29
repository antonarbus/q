import { exit } from 'node:process'
import { infraConfig } from '@back/config/infrastructure'
import { getCloudRunServiceUrl } from '../lib/gcloud/getCloudRunServiceUrl'
import { rollbackCloudRunService } from '../lib/gcloud/rollbackCloudRunService'
import { logger } from '../lib/output/logger'
import axios, { type AxiosResponse } from 'axios'
import type { ResBody } from '@back/api/dev/healthCheckHandler'
import { route } from '@back/api/route'
import type { DeployedEnvironment } from '@root/config/environment'
import { sleep } from 'bun'

type Props = {
  environment: DeployedEnvironment
  previousImageBackend: string
}

export const verifyDeployment = async (props: Props): Promise<void> => {
  try {
    logger.info('Waiting for deployment to be ready...')
    await sleep(10000)

    logger.emptyLine()

    logger.info('=== Verifying Unified Application (Backend serves Frontend) ===')

    // Get backend URL (now serves both frontend and API)
    const appUrl = await getCloudRunServiceUrl({
      cloudRunServiceName: infraConfig[props.environment].cloudRunServiceName,
      region: infraConfig[props.environment].region,
      projectId: infraConfig[props.environment].projectId,
    })

    let totalFailures = 0

    // Test 1: Frontend (HTML) at root path
    logger.info(`Testing Frontend at: ${appUrl}`)

    const frontendResponse = await axios<string>({
      url: appUrl,
      method: 'get',
      responseType: 'text',
    })

    if (frontendResponse.status === 200) {
      logger.success(`  Frontend is live and responding (HTTP ${frontendResponse.status})`)

      // Check for HTML content
      logger.info('  Checking for HTML content...')

      const isValidHtml =
        frontendResponse.data.toLowerCase().includes('<html') ||
        frontendResponse.data.toLowerCase().includes('<!doctype')

      if (isValidHtml === true) {
        logger.success('     HTML content detected')
      } else {
        logger.error('     No HTML content found')
        totalFailures = totalFailures + 1
      }

      // Check response size
      logger.info('  Checking response size...')
      const responseSize = frontendResponse.data.length

      if (responseSize > 100) {
        logger.success(`     Response size: ${responseSize} bytes`)
      } else {
        logger.error(`     Response too small: ${responseSize} bytes (expected > 100)`)

        totalFailures = totalFailures + 1
      }
    } else {
      logger.error(`Frontend returned HTTP ${frontendResponse.status}`)
      totalFailures = totalFailures + 1
    }

    logger.emptyLine()

    // Test 2: Backend API health check
    logger.info(`Testing API at: ${appUrl}/api/health-check`)

    const healthCheckResponse = await axios<ResBody, AxiosResponse<ResBody>>({
      url: `${appUrl}${route.health.url}`,
      method: 'get',
    })

    if (healthCheckResponse.status === 200) {
      logger.success(`  API is live and responding (HTTP ${healthCheckResponse.status})`)
    } else {
      logger.error(`API health check returned HTTP ${healthCheckResponse.status}`)

      totalFailures = totalFailures + 1
    }

    logger.emptyLine()

    // Summary
    if (totalFailures === 0) {
      logger.success('All verification tests passed')
      logger.plain(`🌐 Application URL: ${appUrl}`)
      logger.plain(`🔧 API URL: ${appUrl}/api`)
      logger.emptyLine()
      exit(0)
    } else {
      logger.error(`${totalFailures} verification test(s) failed`)
      logger.warn('Service may not be functioning correctly')
      logger.plain(`🌐 Application URL: ${appUrl}`)
      logger.plain(`🔧 API URL: ${appUrl}/api`)
      logger.emptyLine()

      // Rollback if needed
      const shouldRollback = totalFailures > 0 && Boolean(props.previousImageBackend)

      if (shouldRollback === true) {
        logger.info('Rolling back application...')

        await rollbackCloudRunService({
          cloudRunServiceName: infraConfig[props.environment].cloudRunServiceName,
          previousImage: props.previousImageBackend,
          region: infraConfig[props.environment].region,
          projectId: infraConfig[props.environment].projectId,
        })
      }

      exit(1)
    }
  } catch (error) {
    logger.error(`Deployment verification failed: ${String(error)}`)
    exit(1)
  }
}
