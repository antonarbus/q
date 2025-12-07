import { $ } from 'bun'
import { z } from 'zod'

type Props = {
  cloudRunServiceName: string
  region: string
  projectId: string
}

/** Get Cloud Run service URL */
export const getCloudRunServiceUrl = async (props: Props): Promise<string> => {
  const result: unknown =
    await $`gcloud run services describe ${props.cloudRunServiceName} --region ${props.region} --project ${props.projectId} --format=json`.json()

  const cloudRunServiceResponseSchema = z.object({
    status: z.object({
      url: z.string(),
    }),
  })

  const parsedResult = cloudRunServiceResponseSchema.parse(result)

  return parsedResult.status.url
}
