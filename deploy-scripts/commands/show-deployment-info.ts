/* eslint-disable max-depth */
import { $ } from 'bun'
import { infraConfig } from '../../config/infrastructure'
import { logger } from '../lib/output/logger'
import type { DeployedEnvironment } from 'config/environment'

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
      const lines = tagListOutput.trim().split('\n').slice(1) // Skip header

      for (const line of lines) {
        const parts = line.trim().split(/\s+/u)

        if (parts.length >= 3) {
          const [tagPath, , tagDigest] = parts
          const tag = tagPath?.split('/tags/').pop() ?? null

          const isDigest = tag === envTag && tagDigest !== undefined

          if (isDigest === true) {
            digest = tagDigest
            break
          }
        }
      }

      if (digest === null) {
        logger.warning(`Could not find digest for tag: ${envTag}`)

        return
      }
    } catch {
      logger.warning('Could not get image digest')

      return
    }

    // Now find git SHA tag with the same digest
    let gitSha: string | null = null

    try {
      const tagListOutput =
        await $`gcloud artifacts docker tags list ${baseImageUrl} --project=${props.projectId}`.text()

      const lines = tagListOutput.trim().split('\n').slice(1) // Skip header

      for (const line of lines) {
        const parts = line.trim().split(/\s+/u)

        if (parts.length >= 3) {
          const [tagPath, , tagDigest] = parts // Column 3: DIGEST (0=TAG, 1=IMAGE, 2=DIGEST)
          const tag = tagPath?.split('/tags/').pop() ?? null

          // If this tag points to same digest and looks like a git SHA (40 hex chars), use it

          const isGitSha =
            tagDigest === digest &&
            tag !== null &&
            /^[0-9a-f]{40}$/u.exec(tag) !== null

          if (isGitSha === true) {
            gitSha = tag
            break
          }
        }
      }
    } catch {
      logger.warning('Could not list repository tags')
    }

    // If we found a git SHA, get commit details
    if (typeof gitSha === 'string') {
      try {
        const commitMessage = await $`git log -1 --format=%s ${gitSha}`.text()
        const commitAuthor = await $`git log -1 --format=%an ${gitSha}`.text()
        const commitDate = await $`git log -1 --format=%ar ${gitSha}`.text()

        logger.info(`Git SHA: ${gitSha.substring(0, 7)}`)
        logger.info(`Message: ${commitMessage.trim()}`)
        logger.info(`Author: ${commitAuthor.trim()}`)
        logger.info(`Date: ${commitDate.trim()}`)
      } catch {
        logger.warning('Could not fetch git commit info from repository')
      }
    } else {
      logger.warning('Could not determine git commit SHA')
    }
  } catch (error) {
    logger.error(`Failed to get deployment info for ${props.serviceName}`)

    throw error
  }
}

type Props = {
  environment: DeployedEnvironment
  service?: 'frontend' | 'backend' | 'both'
}

/**
 * Show deployment info for a specific environment
 * Displays git commit SHA and message for currently deployed image
 */
export const showDeploymentInfo = async (props: Props): Promise<void> => {
  const infraConfigForEnvironment = infraConfig[props.environment]
  const service = props.service ?? 'both'

  // Print section header
  logger.warning(props.environment.toUpperCase())
  logger.emptyLine()

  // Show Frontend
  const shouldShowInfoAboutFrontend =
    service === 'frontend' || service === 'both'

  if (shouldShowInfoAboutFrontend === true) {
    logger.info('=== Frontend Service ===')

    await showServiceInfo({
      serviceName: 'Frontend',
      cloudRunServiceName:
        infraConfigForEnvironment.cloudRunServiceNameFrontend,
      region: infraConfigForEnvironment.region,
      projectId: infraConfigForEnvironment.projectId,
    })

    logger.emptyLine()
  }

  // Show Backend
  const shouldShowInfoAboutBackend = service === 'backend' || service === 'both'

  if (shouldShowInfoAboutBackend === true) {
    logger.info('=== Backend Service ===')

    await showServiceInfo({
      serviceName: 'Backend',
      cloudRunServiceName: infraConfigForEnvironment.cloudRunServiceNameBackend,
      region: infraConfigForEnvironment.region,
      projectId: infraConfigForEnvironment.projectId,
    })

    logger.emptyLine()
  }
}
