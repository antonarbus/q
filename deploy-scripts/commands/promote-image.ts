import { $ } from 'bun'
import { sharedConfigVariables, Env } from '../../config/configVariables'
import { exit } from 'process'
import { githubOutput } from '../lib/output/githubOutput'
import { logger } from '../lib/output/logger'

type Props = {
  sourceEnv: Env
  targetEnv: Env
}

export const promoteImage = async (props: Props): Promise<void> => {
  const { region, projectId, artifactRegistryName, dockerImageName } = sharedConfigVariables

  // Construct image URLs (same registry, different tags)
  const baseImage = `${region}-docker.pkg.dev/${projectId}/${artifactRegistryName}/${dockerImageName}`
  const sourceImage = `${baseImage}:${props.sourceEnv}`
  const targetImage = `${baseImage}:${props.targetEnv}`

  logger.info('Promoting Docker image...')
  logger.info(`  Registry: ${artifactRegistryName}`)
  logger.info(`  Source tag: ${props.sourceEnv}`)
  logger.info(`  Target tag: ${props.targetEnv}`)
  logger.emptyLine()

  // Verify source image exists
  logger.info('Verifying source image exists...')

  try {
    await $`gcloud artifacts docker images describe ${sourceImage} --project=${projectId}`.quiet()
  } catch {
    logger.error(`Source image not found: ${sourceImage}`)
    logger.error('Make sure the source environment has been deployed first.')
    exit(1)
  }

  logger.success('Source image found')
  logger.emptyLine()

  // Get the digest (hash) of the source image for traceability
  let sourceImageDigest = 'unknown'

  try {
    const digestOutput =
      await $`gcloud artifacts docker images describe ${sourceImage} --project=${projectId} --format=value(image_summary.digest)`.text()

    sourceImageDigest = digestOutput.trim()
  } catch {
    logger.warning('Could not retrieve source image digest')
  }

  logger.info(`Source image digest (hash): ${sourceImageDigest}`)

  // Add target environment tag to the same image (no pull/push needed)
  // This is much faster than copying between registries
  logger.info('Adding target environment tag...')
  await $`gcloud artifacts docker tags add ${sourceImage} ${targetImage} --project=${projectId} --quiet`

  logger.emptyLine()
  logger.success('Image promoted successfully')
  logger.info(`  Source: ${sourceImage}`)
  logger.info(`  Target: ${targetImage}`)
  logger.info(`  Digest: ${sourceImageDigest} (same image, new tag)`)

  // Export source image digest for traceability
  githubOutput({ sourceImageDigest })
}
