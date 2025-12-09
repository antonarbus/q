import type { DeployedEnvironment } from 'config/environment'
import { infraConfig } from '../../config/infrastructure'
import { getCurrentCloudRunImage } from '../lib/gcloud/getCurrentCloudRunImage'
import { updateCloudRunService } from '../lib/gcloud/updateCloudRunService'
import { logToGithubOutput } from '../lib/output/logToGithubOutput'
import { logger } from '../lib/output/logger'

type Props = {
  environment: DeployedEnvironment
  service?: 'frontend' | 'backend' | 'both'
}

export const deployCloudRun = async (props: Props): Promise<void> => {
  const { service = 'both' } = props // todo: get rid of both if possible

  // Use environment name as the docker image tag
  const dockerImageTag = props.environment

  // Deploy frontend
  const shouldDeployFrontend = service === 'frontend' || service === 'both'

  if (shouldDeployFrontend === true) {
    logger.info('=== Deploying Frontend ===')
    const imageUrl = `${infraConfig[props.environment].region}-docker.pkg.dev/${infraConfig[props.environment].projectId}/${infraConfig[props.environment].artifactRegistryName}/${infraConfig[props.environment].dockerImageNameFrontend}:${dockerImageTag}`

    logger.info('Capturing current frontend image for rollback capability...')

    const previousImageFrontend = await getCurrentCloudRunImage({
      cloudRunServiceName:
        infraConfig[props.environment].cloudRunServiceNameFrontend,
      region: infraConfig[props.environment].region,
      projectId: infraConfig[props.environment].projectId,
    })

    logger.info(`  Previous image: ${previousImageFrontend ?? 'none'}`)

    logToGithubOutput({ previousImageFrontend: previousImageFrontend ?? '' })

    await updateCloudRunService({
      cloudRunServiceName:
        infraConfig[props.environment].cloudRunServiceNameFrontend,
      imageUrl,
      region: infraConfig[props.environment].region,
      projectId: infraConfig[props.environment].projectId,
      environment: props.environment,
    })
  }

  // Deploy backend
  const shouldDeployBackend = service === 'backend' || service === 'both'

  if (shouldDeployBackend === true) {
    logger.info('=== Deploying Backend ===')
    const imageUrl = `${infraConfig[props.environment].region}-docker.pkg.dev/${infraConfig[props.environment].projectId}/${infraConfig[props.environment].artifactRegistryName}/${infraConfig[props.environment].dockerImageNameBackend}:${dockerImageTag}`

    logger.info('Capturing current backend image for rollback capability...')

    const previousImageBackend = await getCurrentCloudRunImage({
      cloudRunServiceName:
        infraConfig[props.environment].cloudRunServiceNameBackend,
      region: infraConfig[props.environment].region,
      projectId: infraConfig[props.environment].projectId,
    })

    logger.info(`  Previous image: ${previousImageBackend ?? 'none'}`)

    logToGithubOutput({ previousImageBackend: previousImageBackend ?? '' })

    await updateCloudRunService({
      cloudRunServiceName:
        infraConfig[props.environment].cloudRunServiceNameBackend,
      imageUrl,
      region: infraConfig[props.environment].region,
      projectId: infraConfig[props.environment].projectId,
      environment: props.environment,
    })
  }

  logger.success('Deployment completed successfully!')
}
