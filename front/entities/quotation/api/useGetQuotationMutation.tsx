import { api } from '@back/api'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/quotation/getQuotationHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useGetQuotationMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.getQuotation],
    mutationFn: async ({ id }: Payload) => {
      const { data } = await axiosWithAuth<
        ResBody,
        AxiosResponse<ResBody>,
        Payload
      >({
        url: api.getQuotation.url,
        method: api.getQuotation.method,
        data: { id },
      })

      return data
    },
  })

  return mutation
}
