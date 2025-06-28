import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/quotation/deleteQuotationHandler'
import { api } from '@back/api'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

type Res = UseMutationResult<ResBody, AxiosError<ResBody>, Payload>

export const useDeleteQuotationMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.deleteQuotation],
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosWithAuth<ResBody>({
        url: api.deleteQuotation.url,
        method: api.deleteQuotation.method,
        data: payload,
      })

      return data
    },
  })

  return mutation
}
