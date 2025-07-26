import type {
  ReqBody as Payload,
  ResBody,
  ErrorResBody,
} from '@back/api/quotation/getQuotationHandler'
import { api } from '@back/api'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosResponse, AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

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
