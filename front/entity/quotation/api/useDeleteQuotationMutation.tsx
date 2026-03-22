import { route } from '@back/api/route'
import type {
  ErrorResBody,
  UrlParam as Payload,
  ResBody,
} from '@back/api/quotation/deleteQuotationHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import { queryKey } from '@shared/lib/tanstack-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useDeleteQuotationMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.deleteQuotation],
    mutationFn: async (payload: Payload) => {
      const response = await axiosWithAuth<ResBody>({
        url: route.deleteQuotation.url(payload.id),
        method: route.deleteQuotation.method,
      })

      return response.data
    },
  })

  return mutation
}
