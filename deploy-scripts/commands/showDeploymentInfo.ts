import { $ } from 'bun'
import { infraConfig } from '@back/config/infrastructure'
import { logger } from '@root/deploy-scripts/lib/output/logger'
import type { DeployedEnvironment } from '@root/config/environment'

type ShowServiceInfoProps = {
  serviceName: string
  cloudRunServiceName: string
  region: string
  projectId: string
}

const showServiceInfo = async (props: ShowServiceInfoProps): Promise<void> => {
  try {
    // Get current image URL
    const format = 'value(spec.template.spec.containers[0].image)'

    const imageOutput =
      await $`gcloud run services describe ${props.cloudRunServiceName} --region ${props.region} --project ${props.projectId} --format=${format}`.text()

    const imageUrl = imageOutput.trim()
    const [baseImageUrl, envTag] = imageUrl.split(':')

    // Get digest for the environment tag
    let digest: string | null = null

    try {
      const tagListOutput =
        await $`gcloud artifacts docker tags list ${baseImageUrl} --project=${props.projectId}`.text()

      // Find the digest for the environment tag (e.g., "dev", "test")

      // Skip header
      const lines = tagListOutput.trim().split('\n').slice(1)

      const matchingParts = lines
        .map((line) => line.trim().split(/\s+/u))
        .find((parts) => {
          const tag = parts[0]?.split('/tags/').pop() ?? null
          return parts.length >= 3 && tag === envTag && parts[2] !== undefined
        })

      digest = matchingParts?.[2] ?? null

      if (digest === null) {
        logger.warn(`Could not find digest for tag: ${envTag}`)

        return
      }
    } catch {
      logger.warn('Could not get image digest')

      return
    }

    // Now find git SHA tag with the same digest
    let gitSha: string | null = null

    try {
      const tagListOutput =
        await $`gcloud artifacts docker tags list ${baseImageUrl} --project=${props.projectId}`.text()

      // Skip header
      const lines = tagListOutput.trim().split('\n').slice(1)

      // Column 3: DIGEST (0=TAG, 1=IMAGE, 2=DIGEST)
      // Find tag pointing to same digest that looks like a git SHA (40 hex chars)
      const matchingParts = lines
        .map((line) => line.trim().split(/\s+/u))
        .find((parts) => {
          const tag = parts[0]?.split('/tags/').pop() ?? null
          return (
            parts.length >= 3 &&
            parts[2] === digest &&
            tag !== null &&
            /^[0-9a-f]{40}$/u.exec(tag) !== null
          )
        })

      gitSha = matchingParts?.[0]?.split('/tags/').pop() ?? null
    } catch {
      logger.warn('Could not list repository tags')
    }

    // If we found a git SHA, get commit details
    if (typeof gitSha === 'string') {
      try {
        const commitMessage = await $`git log -1 --format=%s ${gitSha}`.text()
        const commitAuthor = await $`git log -1 --format=%an ${gitSha}`.text()
        const commitDate = await $`git log -1 --format=%ar ${gitSha}`.text()

        logger.info(`Git SHA: ${gitSha.slice(0, 7)}`)
        logger.info(`Message: ${commitMessage.trim()}`)
        logger.info(`Author: ${commitAuthor.trim()}`)
        logger.info(`Date: ${commitDate.trim()}`)
      } catch {
        logger.warn('Could not fetch git commit info from repository')
      }
    } else {
      logger.warn('Could not determine git commit SHA')
    }
  } catch (error) {
    logger.error(`Failed to get deployment info for ${props.serviceName}`)

    throw error
  }
}

type Props = {
  environment: DeployedEnvironment
}

/**
 * Show deployment info for a specific environment
 * Displays git commit SHA and message for currently deployed image
 */
export const showDeploymentInfo = async (props: Props): Promise<void> => {
  // Print section header
  logger.warn(props.environment.toUpperCase())
  logger.emptyLine()

  logger.info('=== Application Service ===')

  await showServiceInfo({
    serviceName: 'Application',
    cloudRunServiceName: infraConfig[props.environment].cloudRunServiceName,
    region: infraConfig[props.environment].region,
    projectId: infraConfig[props.environment].projectId,
  })

  logger.emptyLine()
}
