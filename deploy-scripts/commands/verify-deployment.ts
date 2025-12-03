import { configVariables, Env } from '../../config/configVariables'
import { exit } from 'process'
import { getCloudRunServiceUrl } from '../lib/gcloud/getCloudRunServiceUrl'
import { rollbackCloudRunService } from '../lib/gcloud/rollbackCloudRunService'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
  previousImage?: string
}

export const verifyDeployment = async (props: Props): Promise<void> => {
  const { cloudRunServiceName, region, projectId } = configVariables[props.env]

  try {
    logger.info('Waiting for deployment to be ready...')
    await Bun.sleep(10000)

    logger.emptyLine()
    logger.info('Getting service URL...')

    const url = await getCloudRunServiceUrl({ cloudRunServiceName, region, projectId })

    logger.info(`Testing URL: ${url}`)
    logger.emptyLine()

    // Test if site responds with 200 OK
    const response = await fetch(url)
    const httpCode = response.status

    if (httpCode === 200) {
      logger.success(`Site is live and responding (HTTP ${httpCode})`)
      logger.emptyLine()

      // Smoke tests: Verify actual content
      logger.info('Running smoke tests...')
      let smokeTestFailures = 0

      const body = await response.text()

      // Test 1: Check that response contains HTML
      logger.info('  1. Checking for HTML content...')

      if (body.toLowerCase().includes('<html') || body.toLowerCase().includes('<!doctype')) {
        logger.success('     HTML content detected')
      } else {
        logger.error('     No HTML content found')
        smokeTestFailures++
      }

      // Test 2: Check response size (should be more than 100 bytes)
      logger.info('  2. Checking response size...')
      const responseSize = body.length

      if (responseSize > 100) {
        logger.success(`     Response size: ${responseSize} bytes`)
      } else {
        logger.error(`     Response too small: ${responseSize} bytes (expected > 100)`)
        smokeTestFailures++
      }

      // Test 3: Check response time
      logger.info('  3. Checking response time...')
      const startTime = performance.now()
      await fetch(url)
      const endTime = performance.now()
      const responseTime = endTime - startTime

      logger.info(`     Response time: ${responseTime.toFixed(2)}ms`)

      if (responseTime < 10000) {
        logger.success('     Response time acceptable')
      } else {
        logger.warning('     Response time slow (> 10s)')
      }

      logger.emptyLine()

      if (smokeTestFailures === 0) {
        logger.success('All smoke tests passed')
        logger.plain(`🌐 Deployment URL: ${url}`)
        logger.emptyLine()

        exit(0)
      } else {
        logger.error(`${smokeTestFailures} smoke test(s) failed`)
        logger.warning('Site is responding but content may be incorrect')
        logger.plain(`🌐 URL: ${url}`)
        logger.emptyLine()

        // Trigger rollback for smoke test failures
        if (props.previousImage && props.previousImage !== 'none') {
          await rollbackCloudRunService({
            cloudRunServiceName,
            previousImage: props.previousImage,
            region,
            projectId
          })
        }

        exit(1)
      }
    } else {
      logger.error(`Site returned HTTP ${httpCode}`)
      logger.emptyLine()

      // Attempt rollback if previous image is available
      if (props.previousImage && props.previousImage !== 'none') {
        await rollbackCloudRunService({
          cloudRunServiceName,
          previousImage: props.previousImage,
          region,
          projectId
        })

        logger.emptyLine()
        logger.info('Waiting 10s for rollback to stabilize...')
        await Bun.sleep(10000)

        // Verify rollback worked
        const rollbackResponse = await fetch(url)
        const rollbackHttpCode = rollbackResponse.status

        if (rollbackHttpCode === 200) {
          logger.success(`Service restored and responding (HTTP ${rollbackHttpCode})`)
        } else {
          logger.warning(
            `Rollback completed but service still not responding properly (HTTP ${rollbackHttpCode})`
          )
        }
      } else {
        logger.warning('No previous image available for rollback')
      }

      logger.emptyLine()
      exit(1)
    }
  } catch (error) {
    logger.error(`Deployment verification failed: ${error}`)
    exit(1)
  }
}
