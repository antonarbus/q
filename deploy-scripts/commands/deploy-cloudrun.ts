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
  const infraConfigForEnvironment = infraConfig[props.environment]

  // Use environment name as the docker image tag
  const dockerImageTag = props.environment

  // Deploy frontend
  const shouldDeployFrontend = service === 'frontend' || service === 'both'

  if (shouldDeployFrontend === true) {
    logger.info('=== Deploying Frontend ===')
    const imageUrl = `${infraConfigForEnvironment.region}-docker.pkg.dev/${infraConfigForEnvironment.projectId}/${infraConfigForEnvironment.artifactRegistryName}/${infraConfigForEnvironment.dockerImageNameFrontend}:${dockerImageTag}`

    logger.info('Capturing current frontend image for rollback capability...')

    const previousImageFrontend = await getCurrentCloudRunImage({
      cloudRunServiceName:
        infraConfigForEnvironment.cloudRunServiceNameFrontend,
      region: infraConfigForEnvironment.region,
      projectId: infraConfigForEnvironment.projectId,
    })

    logger.info(`  Previous image: ${previousImageFrontend ?? 'none'}`)

    logToGithubOutput({ previousImageFrontend: previousImageFrontend ?? '' })

    await updateCloudRunService({
      cloudRunServiceName:
        infraConfigForEnvironment.cloudRunServiceNameFrontend,
      imageUrl,
      region: infraConfigForEnvironment.region,
      projectId: infraConfigForEnvironment.projectId,
      environment: props.environment,
    })
  }

  // Deploy backend
  const shouldDeployBackend = service === 'backend' || service === 'both'

  if (shouldDeployBackend === true) {
    logger.info('=== Deploying Backend ===')
    const imageUrl = `${infraConfigForEnvironment.region}-docker.pkg.dev/${infraConfigForEnvironment.projectId}/${infraConfigForEnvironment.artifactRegistryName}/${infraConfigForEnvironment.dockerImageNameBackend}:${dockerImageTag}`

    logger.info('Capturing current backend image for rollback capability...')

    const previousImageBackend = await getCurrentCloudRunImage({
      cloudRunServiceName: infraConfigForEnvironment.cloudRunServiceNameBackend,
      region: infraConfigForEnvironment.region,
      projectId: infraConfigForEnvironment.projectId,
    })

    logger.info(`  Previous image: ${previousImageBackend ?? 'none'}`)

    logToGithubOutput({ previousImageBackend: previousImageBackend ?? '' })

    await updateCloudRunService({
      cloudRunServiceName: infraConfigForEnvironment.cloudRunServiceNameBackend,
      imageUrl,
      region: infraConfigForEnvironment.region,
      projectId: infraConfigForEnvironment.projectId,
      environment: props.environment,
    })
  }

  logger.success('Deployment completed successfully!')
}
