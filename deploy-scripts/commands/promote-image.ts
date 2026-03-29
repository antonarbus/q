import { $ } from 'bun'
import { exit } from 'process'
import { sharedInfraConfig } from '@back/config/infrastructure'
import { logToGithubOutput } from '../lib/output/logToGithubOutput'
import { logger } from '../lib/output/logger'
import type { DeployedEnvironment } from '@root/config/environment'

type PromoteServiceImageProps = {
  serviceName: string
  dockerImageName: string
  region: string
  projectId: string
  artifactRegistryName: string
  sourceEnvironment: DeployedEnvironment
  targetEnvironment: DeployedEnvironment
}

const promoteServiceImage = async (props: PromoteServiceImageProps): Promise<void> => {
  logger.info(`Promoting ${props.serviceName} image...`)

  // Construct image URLs (same registry, different tags)
  const baseImage = `${props.region}-docker.pkg.dev/${props.projectId}/${props.artifactRegistryName}/${props.dockerImageName}`
  const sourceImage = `${baseImage}:${props.sourceEnvironment}`
  const targetImage = `${baseImage}:${props.targetEnvironment}`

  // Verify source image exists
  logger.info(`  Verifying ${props.serviceName} source image exists...`)

  try {
    await $`gcloud artifacts docker images describe ${sourceImage} --project=${props.projectId}`.quiet()
  } catch {
    logger.error(`${props.serviceName} source image not found: ${sourceImage}`)
    logger.error('Make sure the source environment has been deployed first.')
    exit(1)
  }

  logger.success(`  ${props.serviceName} source image found`)

  // Get the digest (hash) of the source image for traceability
  let sourceImageDigest = 'unknown'

  try {
    const digestOutput =
      await $`gcloud artifacts docker images describe ${sourceImage} --project=${props.projectId} --format=value(image_summary.digest)`.text()

    sourceImageDigest = digestOutput.trim()
  } catch {
    logger.warning(`  Could not retrieve ${props.serviceName} source image digest`)
  }

  logger.info(`  ${props.serviceName} digest: ${sourceImageDigest}`)

  // Add target environment tag to the same image (no pull/push needed)
  logger.info(`  Adding ${props.serviceName} target environment tag...`)
  await $`gcloud artifacts docker tags add ${sourceImage} ${targetImage} --project=${props.projectId} --quiet`

  logger.success(`  ${props.serviceName} image promoted successfully`)
  logger.info(`    Source: ${sourceImage}`)
  logger.info(`    Target: ${targetImage}`)
  logger.emptyLine()

  // Export source image digest for traceability
  logToGithubOutput({
    [`${props.serviceName.toLowerCase()}SourceImageDigest`]: sourceImageDigest,
  })
}

type Props = {
  sourceEnvironment: DeployedEnvironment
  targetEnvironment: DeployedEnvironment
}

export const promoteImage = async (props: Props): Promise<void> => {
  logger.info('Promoting Docker image...')
  logger.info(`  Registry: ${sharedInfraConfig.artifactRegistryName}`)
  logger.info(`  Source tag: ${props.sourceEnvironment}`)
  logger.info(`  Target tag: ${props.targetEnvironment}`)
  logger.emptyLine()

  await promoteServiceImage({
    serviceName: 'Application',
    dockerImageName: sharedInfraConfig.dockerImageName,
    region: sharedInfraConfig.region,
    projectId: sharedInfraConfig.projectId,
    artifactRegistryName: sharedInfraConfig.artifactRegistryName,
    sourceEnvironment: props.sourceEnvironment,
    targetEnvironment: props.targetEnvironment,
  })
}
