import type {
  ResBody,
  ReqBody as Payload,
  ErrorResBody,
} from '@back/api/quotation/deleteQuotationHandler'
import { api } from '@back/api'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useDeleteQuotationMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
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
