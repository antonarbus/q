import {
  type ReqBody as Payload,
  type ResBody,
} from '@server/api/quotation/getQuotationRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosResponse, type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useGetQuotationMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const mutation = useMutation({
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
