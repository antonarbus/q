import { $ } from 'bun'
import { sharedConfigVariables } from '../../config/configVariables'
import { logger } from '../lib/output/logger'

/** List all enabled Google Cloud services for the project */
export const listGcloudServices = async (): Promise<void> => {
  const { projectId } = sharedConfigVariables

  try {
    logger.info(`Listing enabled services for project: ${projectId}`)
    const output = await $`gcloud services list --enabled --project=${projectId}`.text()
    console.log(output)
    logger.success('Services listed successfully')
  } catch (error) {
    logger.error(`Failed to list services: ${error}`)
    throw error
  }
}
