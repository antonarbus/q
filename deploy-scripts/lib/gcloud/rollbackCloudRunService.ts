import { $ } from 'bun'
import { logger } from '../output/logger'

type Props = {
  cloudRunServiceName: string
  previousImage: string
  region: string
  projectId: string
}

/** Rollback Cloud Run service to previous image */
export const rollbackCloudRunService = async (props: Props): Promise<void> => {
  logger.warning('Attempting rollback to previous image...')
  logger.info(`  Rolling back to: ${props.previousImage}`)

  await $`gcloud run services update ${props.cloudRunServiceName} --image ${props.previousImage} --region ${props.region} --project ${props.projectId}`

  logger.success('Rollback successful')
}
