import { type Env, infraConfigVariables } from '../../config/infrastructure'
import { getCurrentCloudRunImage } from '../lib/gcloud/getCurrentCloudRunImage'
import { updateCloudRunService } from '../lib/gcloud/updateCloudRunService'
import { githubOutput } from '../lib/output/githubOutput'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
  service?: 'frontend' | 'backend' | 'both'
}

export async function deployCloudRun(props: Props): Promise<void> {
  const { env, service = 'both' } = props
  const config = infraConfigVariables[env]

  // Use environment name as the docker image tag
  const dockerImageTag = env

  // Deploy frontend
  if (service === 'frontend' || service === 'both') {
    logger.info('=== Deploying Frontend ===')
    const imageUrl = `${config.region}-docker.pkg.dev/${config.projectId}/${config.artifactRegistryName}/${config.dockerImageNameFrontend}:${dockerImageTag}`

    logger.info('Capturing current frontend image for rollback capability...')
    const previousImageFrontend = await getCurrentCloudRunImage({
      cloudRunServiceName: config.cloudRunServiceNameFrontend,
      region: config.region,
      projectId: config.projectId,
    })

    logger.info(`  Previous image: ${previousImageFrontend || 'none'}`)

    githubOutput({ previousImageFrontend: previousImageFrontend || '' })

    await updateCloudRunService({
      cloudRunServiceName: config.cloudRunServiceNameFrontend,
      imageUrl,
      region: config.region,
      projectId: config.projectId,
      environment: env,
    })
  }

  // Deploy backend
  if (service === 'backend' || service === 'both') {
    logger.info('=== Deploying Backend ===')
    const imageUrl = `${config.region}-docker.pkg.dev/${config.projectId}/${config.artifactRegistryName}/${config.dockerImageNameBackend}:${dockerImageTag}`

    logger.info('Capturing current backend image for rollback capability...')
    const previousImageBackend = await getCurrentCloudRunImage({
      cloudRunServiceName: config.cloudRunServiceNameBackend,
      region: config.region,
      projectId: config.projectId,
    })

    logger.info(`  Previous image: ${previousImageBackend || 'none'}`)

    githubOutput({ previousImageBackend: previousImageBackend || '' })

    await updateCloudRunService({
      cloudRunServiceName: config.cloudRunServiceNameBackend,
      imageUrl,
      region: config.region,
      projectId: config.projectId,
      environment: env,
    })
  }

  logger.success('Deployment completed successfully!')
}
