import { route } from '@back/api/route'
import type {
  ErrorResBody,
  UrlParam as Payload,
  ResBody,
} from '@back/api/quotation/getQuotationHandler'
import { axiosHolder } from '@front/shared/lib/axios'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useGetQuotationMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.getQuotation],
    mutationFn: async (payload: Payload) => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.getQuotation.url(payload.id),
        method: route.getQuotation.method,
      })

      return response.data
    },
  })

  return mutation
}
