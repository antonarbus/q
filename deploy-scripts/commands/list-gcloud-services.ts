import { $ } from 'bun'
import { sharedInfraConfig } from '../../config/infrastructure'
import { logger } from '../lib/output/logger'

/** List all enabled Google Cloud services for the project */
export const listGcloudServices = async (): Promise<void> => {
  try {
    logger.info(
      `Listing enabled services for project: ${sharedInfraConfig.projectId}`,
    )

    const output =
      await $`gcloud services list --enabled --project=${sharedInfraConfig.projectId}`.text()

    console.info(output)
    logger.success('Services listed successfully')
  } catch (error) {
    logger.error(`Failed to list services: ${String(error)}`)

    throw error
  }
}
