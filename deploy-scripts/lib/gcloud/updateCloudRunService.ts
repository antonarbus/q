import { $ } from 'bun'
import { logger } from '../output/logger'
import type { DeployedEnvironment } from '@root/config/environment'

type Props = {
  cloudRunServiceName: string
  imageUrl: string
  region: string
  projectId: string
  environment: DeployedEnvironment
  backendUrl: string // For frontend: nginx proxy target. For backend: not used but required.
}

/** Update Cloud Run service with new image */
export const updateCloudRunService = async (props: Props): Promise<void> => {
  logger.info('Deploying Docker image to Cloud Run...')
  logger.info(`  Service: ${props.cloudRunServiceName}`)
  logger.info(`  Region: ${props.region}`)
  logger.info(`  Project: ${props.projectId}`)
  logger.info(`  Image: ${props.imageUrl}`)
  logger.info(`  Environment: ${props.environment}`)
  logger.emptyLine()

  // Build env vars string - BACKEND_URL is only used by frontend nginx
  const envVars = `NODE_ENV=production,ENVIRONMENT=${props.environment},BACKEND_URL=${props.backendUrl}`

  await $`gcloud run services update ${props.cloudRunServiceName} --image ${props.imageUrl} --region ${props.region} --project ${props.projectId} --set-env-vars ${envVars}`

  logger.emptyLine()
  logger.success('Docker image deployed to Cloud Run successfully')
}
