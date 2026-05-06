import { route } from '@back/api/route'
import type { ErrorResBody, ReqBody as Payload, ResBody } from '@back/api/ai/suggestRowHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useAiSuggestRowMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.aiSuggestRow],
    mutationFn: async (payload: Payload) => {
      const response = await axiosHolder.axiosWithAuth<ResBody>({
        url: route.aiSuggestRow.url,
        method: route.aiSuggestRow.method,
        data: payload,
      })

      return response.data
    },
  })

  return mutation
}
