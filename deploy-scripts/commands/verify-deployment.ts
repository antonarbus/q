import { exit } from 'process'
import { type Env, infraConfigVariables } from '../../config/infrastructure'
import { getCloudRunServiceUrl } from '../lib/gcloud/getCloudRunServiceUrl'
import { rollbackCloudRunService } from '../lib/gcloud/rollbackCloudRunService'
import { logger } from '../lib/output/logger'
import axios, { type AxiosResponse } from 'axios'
import type { ResBody } from '@back/api/dev/healthCheckHandler'
import { api } from '@back/api'

type Props = {
  env: Env
  previousImageFrontend: string
  previousImageBackend: string
}

export const verifyDeployment = async (props: Props): Promise<void> => {
  const config = infraConfigVariables[props.env]

  try {
    logger.info('Waiting for deployment to be ready...')
    await Bun.sleep(10000)

    logger.emptyLine()
    logger.info('=== Verifying Frontend ===')

    // Get frontend URL
    const frontendUrl = await getCloudRunServiceUrl({
      cloudRunServiceName: config.cloudRunServiceNameFrontend,
      region: config.region,
      projectId: config.projectId,
    })

    logger.info(`Testing Frontend URL: ${frontendUrl}`)

    // Test frontend
    let frontendFailures = 0

    const frontendResponse = await axios<string>({
      url: api.health.url,
      method: 'get',
      responseType: 'text',
    })

    if (frontendResponse.status === 200) {
      logger.success(
        `Frontend is live and responding (HTTP ${frontendResponse.status})`,
      )

      // Check for HTML content
      logger.info('  Checking for HTML content...')

      const isValidHtml =
        frontendResponse.data.toLowerCase().includes('<html') ||
        frontendResponse.data.toLowerCase().includes('<!doctype')

      if (isValidHtml === true) {
        logger.success('     HTML content detected')
      } else {
        logger.error('     No HTML content found')
        frontendFailures = frontendFailures + 1
      }

      // Check response size
      logger.info('  Checking response size...')
      const responseSize = frontendResponse.data.length

      if (responseSize > 100) {
        logger.success(`     Response size: ${responseSize} bytes`)
      } else {
        logger.error(
          `     Response too small: ${responseSize} bytes (expected > 100)`,
        )

        frontendFailures = frontendFailures + 1
      }
    } else {
      logger.error(`Frontend returned HTTP ${frontendResponse.status}`)
      frontendFailures = frontendFailures + 1
    }

    logger.emptyLine()
    logger.info('=== Verifying Backend ===')

    // Get backend URL
    const backendUrl = await getCloudRunServiceUrl({
      cloudRunServiceName: config.cloudRunServiceNameBackend,
      region: config.region,
      projectId: config.projectId,
    })

    logger.info(`Testing Backend URL: ${backendUrl}/api/health-check`)

    // Test backend health check
    let backendFailures = 0
    // const backendResponse = await fetch(`${backendUrl}/api/health-check`)

    const healthCheckResponse = await axios<ResBody, AxiosResponse<ResBody>>({
      url: `${backendUrl}${api.health.url}`,
      method: 'get',
    })

    if (healthCheckResponse.status === 200) {
      logger.success(
        `Backend is live and responding (HTTP ${healthCheckResponse.status})`,
      )

      try {
        logger.info('  Checking health check message...')

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (healthCheckResponse.data.message === 'connected') {
          logger.success('     Health check message correct: "connected"')
        }
      } catch {
        logger.error('     Failed to parse JSON response')
        backendFailures = backendFailures + 1
      }
    } else {
      logger.error(
        `Backend health check returned HTTP ${healthCheckResponse.status}`,
      )

      backendFailures = backendFailures + 1
    }

    logger.emptyLine()

    // Summary
    const totalFailures = frontendFailures + backendFailures

    if (totalFailures === 0) {
      logger.success('All verification tests passed')
      logger.plain(`🌐 Frontend URL: ${frontendUrl}`)
      logger.plain(`🔧 Backend URL: ${backendUrl}`)
      logger.emptyLine()
      exit(0)
    } else {
      logger.error(`${totalFailures} verification test(s) failed`)
      logger.warning('Services may not be functioning correctly')
      logger.plain(`🌐 Frontend URL: ${frontendUrl}`)
      logger.plain(`🔧 Backend URL: ${backendUrl}`)
      logger.emptyLine()

      // Rollback frontend if needed
      const shouldRollbackFrontend =
        frontendFailures > 0 && Boolean(props.previousImageFrontend)

      if (shouldRollbackFrontend === true) {
        logger.info('Rolling back frontend...')

        await rollbackCloudRunService({
          cloudRunServiceName: config.cloudRunServiceNameFrontend,
          previousImage: props.previousImageFrontend,
          region: config.region,
          projectId: config.projectId,
        })
      }

      // Rollback backend if needed
      const shouldRollbackBackend =
        backendFailures > 0 && Boolean(props.previousImageBackend)

      if (shouldRollbackBackend === true) {
        logger.info('Rolling back backend...')

        await rollbackCloudRunService({
          cloudRunServiceName: config.cloudRunServiceNameBackend,
          previousImage: props.previousImageBackend,
          region: config.region,
          projectId: config.projectId,
        })
      }

      exit(1)
    }
  } catch (error) {
    logger.error(`Deployment verification failed: ${String(error)}`)
    exit(1)
  }
}
