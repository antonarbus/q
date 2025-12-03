import { $ } from 'bun'
import { logger } from '../output/logger'

type Props = {
  cloudRunServiceName: string
  region: string
  projectId: string
}

/** Get current image of Cloud Run service */
export const getCurrentCloudRunImage = async (props: Props): Promise<string | null> => {
  try {
    const format = 'value(spec.template.spec.containers[0].image)'

    const result =
      await $`gcloud run services describe ${props.cloudRunServiceName} --region ${props.region} --project ${props.projectId} --format=${format}`.text()

    return result.trim() || null
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logger.warning(`Could not retrieve current image: ${errorMessage}`)
    return null
  }
}
