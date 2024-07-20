import {
  type ReqBody as Payload,
  type ResBody,
} from '@back/api/quotation/getQuotationRouter'
import { apiUrl } from '@back/consts/apiUrl'
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
        url: apiUrl.getQuotation,
        method: 'POST',
        data: { id },
      })

      return data
    },
  })

  return mutation
}
