import { configVariables, Env } from '../../config/configVariables'
import { getCurrentCloudRunImage } from '../lib/gcloud/getCurrentCloudRunImage'
import { updateCloudRunService } from '../lib/gcloud/updateCloudRunService'
import { githubOutput } from '../lib/output/githubOutput'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
}

export async function deployCloudRun(props: Props): Promise<void> {
  const { region, projectId, artifactRegistryName, dockerImageName, cloudRunServiceName } =
    configVariables[props.env]

  // Use environment name as the docker image tag
  const dockerImageTag = props.env

  // Construct the image URL
  const imageUrl = `${region}-docker.pkg.dev/${projectId}/${artifactRegistryName}/${dockerImageName}:${dockerImageTag}`

  // Capture current image for potential rollback
  logger.info('Capturing current image for rollback capability...')
  const previousImage = await getCurrentCloudRunImage({
    cloudRunServiceName,
    region,
    projectId
  })

  logger.info(`  Previous image: ${previousImage || 'none'}`)

  // Export for use in verify-deployment (even if null - verification handles it)
  githubOutput({ previousImage: previousImage || '' })

  // Deploy to Cloud Run
  await updateCloudRunService({
    cloudRunServiceName,
    imageUrl,
    region,
    projectId
  })
}
