import { $ } from 'bun'
import { sharedInfraConfigVariables } from '../../config/infrastructure'
import { logger } from '../lib/output/logger'

/** List all enabled Google Cloud services for the project */
export const listGcloudServices = async (): Promise<void> => {
  const { projectId } = sharedInfraConfigVariables

  try {
    logger.info(`Listing enabled services for project: ${projectId}`)

    const output =
      await $`gcloud services list --enabled --project=${projectId}`.text()

    console.info(output)
    logger.success('Services listed successfully')
  } catch (error) {
    logger.error(`Failed to list services: ${String(error)}`)

    throw error
  }
}
