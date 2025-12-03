import { $ } from 'bun'
import { configVariables, Env } from '../../config/configVariables'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
}

/**
 * Show deployment info for a specific environment
 * Displays git commit SHA and message for currently deployed image
 */
export const showDeploymentInfo = async (props: Props): Promise<void> => {
  const { region, projectId, cloudRunServiceName } = configVariables[props.env]

  // Print section header
  logger.warning(`${props.env.toUpperCase()}`)

  try {
    // Get current image URL
    const format = 'value(spec.template.spec.containers[0].image)'

    const imageOutput =
      await $`gcloud run services describe ${cloudRunServiceName} --region ${region} --project ${projectId} --format=${format}`.text()

    const imageUrl = imageOutput.trim()
    const baseImageUrl = imageUrl.split(':')[0]
    const envTag = imageUrl.split(':')[1]

    // Get digest for the environment tag
    let digest: string | null = null

    try {
      const tagListOutput =
        await $`gcloud artifacts docker tags list ${baseImageUrl} --project=${projectId}`.text()

      // Find the digest for the environment tag (e.g., "dev", "test")
      const lines = tagListOutput.trim().split('\n').slice(1) // Skip header

      for (const line of lines) {
        const parts = line.trim().split(/\s+/)
        if (parts.length >= 3) {
          const tagPath = parts[0]
          const tagDigest = parts[2] // Column 3: DIGEST (0=TAG, 1=IMAGE, 2=DIGEST)
          const tag = tagPath.split('/tags/').pop()

          if (tag === envTag) {
            digest = tagDigest
            break
          }
        }
      }

      if (!digest) {
        logger.warning(`Could not find digest for tag: ${envTag}`)
        return
      }
    } catch (error) {
      logger.warning('Could not get image digest')
      return
    }

    // Now find git SHA tag with the same digest
    let gitSha: string | null = null

    try {
      const tagListOutput =
        await $`gcloud artifacts docker tags list ${baseImageUrl} --project=${projectId}`.text()

      const lines = tagListOutput.trim().split('\n').slice(1) // Skip header

      for (const line of lines) {
        const parts = line.trim().split(/\s+/)
        if (parts.length >= 3) {
          const tagPath = parts[0]
          const tagDigest = parts[2] // Column 3: DIGEST (0=TAG, 1=IMAGE, 2=DIGEST)
          const tag = tagPath.split('/tags/').pop()

          // If this tag points to same digest and looks like a git SHA (40 hex chars), use it
          if (tagDigest === digest && tag && tag.match(/^[0-9a-f]{40}$/)) {
            gitSha = tag
            break
          }
        }
      }
    } catch (error) {
      logger.warning('Could not list repository tags')
    }

    // If we found a git SHA, get commit details
    if (gitSha) {
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
    logger.error(`Failed to get deployment info for ${props.env}`)
    throw error
  }
}
