import type {
  ReqBody as Payload,
  ResBody,
} from '@back/api/quotation/getQuotation'
import { api } from '@back/shared/consts/api'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosResponse, type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useGetQuotationMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const mutation = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.getQuotation],
    mutationFn: async ({ id }: Payload) => {
      const { data } = await axios<ResBody, AxiosResponse<ResBody>, Payload>({
        url: api.getQuotation.url,
        method: api.getQuotation.method,
        data: { id },
      })

      return data
    },
  })

  return mutation
}
