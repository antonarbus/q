import { exit } from 'process'
import { configVariables, type Env } from '../../config/configVariables'
import { getCloudRunServiceUrl } from '../lib/gcloud/getCloudRunServiceUrl'
import { rollbackCloudRunService } from '../lib/gcloud/rollbackCloudRunService'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
  previousImageFrontend: string
  previousImageBackend: string
}

export const verifyDeployment = async (props: Props): Promise<void> => {
  const config = configVariables[props.env]

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
    const frontendResponse = await fetch(frontendUrl)
    const frontendHttpCode = frontendResponse.status

    if (frontendHttpCode === 200) {
      logger.success(
        `Frontend is live and responding (HTTP ${frontendHttpCode})`,
      )

      const body = await frontendResponse.text()

      // Check for HTML content
      logger.info('  Checking for HTML content...')
      if (
        body.toLowerCase().includes('<html') ||
        body.toLowerCase().includes('<!doctype')
      ) {
        logger.success('     HTML content detected')
      } else {
        logger.error('     No HTML content found')
        frontendFailures++
      }

      // Check response size
      logger.info('  Checking response size...')
      const responseSize = body.length
      if (responseSize > 100) {
        logger.success(`     Response size: ${responseSize} bytes`)
      } else {
        logger.error(
          `     Response too small: ${responseSize} bytes (expected > 100)`,
        )
        frontendFailures++
      }
    } else {
      logger.error(`Frontend returned HTTP ${frontendHttpCode}`)
      frontendFailures++
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
    const backendResponse = await fetch(`${backendUrl}/api/health-check`)
    const backendHttpCode = backendResponse.status

    if (backendHttpCode === 200) {
      logger.success(`Backend is live and responding (HTTP ${backendHttpCode})`)

      try {
        const healthData = await backendResponse.json()

        // Check for 'connected' message
        logger.info('  Checking health check message...')
        if (healthData.message === 'connected') {
          logger.success('     Health check message correct: "connected"')
        } else {
          logger.error(
            `     Unexpected message: "${healthData.message}" (expected "connected")`,
          )
          backendFailures++
        }
      } catch {
        logger.error('     Failed to parse JSON response')
        backendFailures++
      }
    } else {
      logger.error(`Backend health check returned HTTP ${backendHttpCode}`)
      backendFailures++
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
      if (frontendFailures > 0 && props.previousImageFrontend) {
        logger.info('Rolling back frontend...')
        await rollbackCloudRunService({
          cloudRunServiceName: config.cloudRunServiceNameFrontend,
          previousImage: props.previousImageFrontend,
          region: config.region,
          projectId: config.projectId,
        })
      }

      // Rollback backend if needed
      if (backendFailures > 0 && props.previousImageBackend) {
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
    logger.error(`Deployment verification failed: ${error}`)
    exit(1)
  }
}
