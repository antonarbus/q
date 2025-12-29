import type { DeployedEnvironment } from '@root/config/environment'
import { infraConfig } from '@root/config/infrastructure'
import { getCurrentCloudRunImage } from '../lib/gcloud/getCurrentCloudRunImage'
import { updateCloudRunService } from '../lib/gcloud/updateCloudRunService'
import { logToGithubOutput } from '../lib/output/logToGithubOutput'
import { logger } from '../lib/output/logger'

type Props = {
  environment: DeployedEnvironment
}

export const deployCloudRun = async (props: Props): Promise<void> => {
  // Use environment name as the docker image tag
  const dockerImageTag = props.environment

  logger.info('=== Deploying Application (Unified Container) ===')
  const imageUrl = `${infraConfig[props.environment].region}-docker.pkg.dev/${infraConfig[props.environment].projectId}/${infraConfig[props.environment].artifactRegistryName}/${infraConfig[props.environment].dockerImageName}:${dockerImageTag}`

  logger.info('Capturing current image for rollback capability...')

  const previousImageBackend = await getCurrentCloudRunImage({
    cloudRunServiceName: infraConfig[props.environment].cloudRunServiceName,
    region: infraConfig[props.environment].region,
    projectId: infraConfig[props.environment].projectId,
  })

  logger.info(`  Previous image: ${previousImageBackend ?? 'none'}`)

  logToGithubOutput({ previousImageBackend: previousImageBackend ?? '' })

  await updateCloudRunService({
    cloudRunServiceName: infraConfig[props.environment].cloudRunServiceName,
    imageUrl,
    region: infraConfig[props.environment].region,
    projectId: infraConfig[props.environment].projectId,
    environment: props.environment,
  })

  logger.success('Deployment completed successfully!')
}
