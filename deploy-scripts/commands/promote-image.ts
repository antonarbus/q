import { $ } from 'bun'
import { exit } from 'process'
import {
  type Env,
  sharedInfraConfigVariables,
} from '../../config/infrastructure'
import { githubOutput } from '../lib/output/githubOutput'
import { logger } from '../lib/output/logger'

type Props = {
  sourceEnv: Env
  targetEnv: Env
  service?: 'frontend' | 'backend' | 'both'
}

export const promoteImage = async (props: Props): Promise<void> => {
  const {
    region,
    projectId,
    artifactRegistryName,
    dockerImageNameFrontend,
    dockerImageNameBackend,
  } = sharedInfraConfigVariables
  const service = props.service || 'both'

  logger.info('Promoting Docker images...')
  logger.info(`  Registry: ${artifactRegistryName}`)
  logger.info(`  Source tag: ${props.sourceEnv}`)
  logger.info(`  Target tag: ${props.targetEnv}`)
  logger.info(`  Service: ${service}`)
  logger.emptyLine()

  // Promote Frontend
  if (service === 'frontend' || service === 'both') {
    await promoteServiceImage({
      serviceName: 'Frontend',
      dockerImageName: dockerImageNameFrontend,
      region,
      projectId,
      artifactRegistryName,
      sourceEnv: props.sourceEnv,
      targetEnv: props.targetEnv,
    })
  }

  // Promote Backend
  if (service === 'backend' || service === 'both') {
    await promoteServiceImage({
      serviceName: 'Backend',
      dockerImageName: dockerImageNameBackend,
      region,
      projectId,
      artifactRegistryName,
      sourceEnv: props.sourceEnv,
      targetEnv: props.targetEnv,
    })
  }
}

type PromoteServiceImageProps = {
  serviceName: string
  dockerImageName: string
  region: string
  projectId: string
  artifactRegistryName: string
  sourceEnv: Env
  targetEnv: Env
}

async function promoteServiceImage(
  props: PromoteServiceImageProps,
): Promise<void> {
  const {
    serviceName,
    dockerImageName,
    region,
    projectId,
    artifactRegistryName,
    sourceEnv,
    targetEnv,
  } = props

  logger.info(`Promoting ${serviceName} image...`)

  // Construct image URLs (same registry, different tags)
  const baseImage = `${region}-docker.pkg.dev/${projectId}/${artifactRegistryName}/${dockerImageName}`
  const sourceImage = `${baseImage}:${sourceEnv}`
  const targetImage = `${baseImage}:${targetEnv}`

  // Verify source image exists
  logger.info(`  Verifying ${serviceName} source image exists...`)

  try {
    await $`gcloud artifacts docker images describe ${sourceImage} --project=${projectId}`.quiet()
  } catch {
    logger.error(`${serviceName} source image not found: ${sourceImage}`)
    logger.error('Make sure the source environment has been deployed first.')
    exit(1)
  }

  logger.success(`  ${serviceName} source image found`)

  // Get the digest (hash) of the source image for traceability
  let sourceImageDigest = 'unknown'

  try {
    const digestOutput =
      await $`gcloud artifacts docker images describe ${sourceImage} --project=${projectId} --format=value(image_summary.digest)`.text()

    sourceImageDigest = digestOutput.trim()
  } catch {
    logger.warning(`  Could not retrieve ${serviceName} source image digest`)
  }

  logger.info(`  ${serviceName} digest: ${sourceImageDigest}`)

  // Add target environment tag to the same image (no pull/push needed)
  logger.info(`  Adding ${serviceName} target environment tag...`)
  await $`gcloud artifacts docker tags add ${sourceImage} ${targetImage} --project=${projectId} --quiet`

  logger.success(`  ${serviceName} image promoted successfully`)
  logger.info(`    Source: ${sourceImage}`)
  logger.info(`    Target: ${targetImage}`)
  logger.emptyLine()

  // Export source image digest for traceability
  githubOutput({
    [`${serviceName.toLowerCase()}SourceImageDigest`]: sourceImageDigest,
  })
}
