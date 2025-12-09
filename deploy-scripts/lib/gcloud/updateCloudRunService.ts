import { $ } from 'bun'
import type { Env } from '../../../config/infrastructure'
import { logger } from '../output/logger'

type Props = {
  cloudRunServiceName: string
  imageUrl: string
  region: string
  projectId: string
  environment: Env
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

  await $`gcloud run services update ${props.cloudRunServiceName} --image ${props.imageUrl} --region ${props.region} --project ${props.projectId} --set-env-vars NODE_ENV=production,ENVIRONMENT=${props.environment}`

  logger.emptyLine()
  logger.success('Docker image deployed to Cloud Run successfully')
}
