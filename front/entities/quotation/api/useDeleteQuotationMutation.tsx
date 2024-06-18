import {
  type ResBody,
  type ReqBody as Payload,
} from '@back/api/quotation/deleteQuotationRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useDeleteQuotationMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const mutation = useMutation({
    mutationKey: [queryKey.deleteQuotation],
    mutationFn: async (payload: Payload) => {
      const res = await axiosWithAuth<ResBody>({
        url: apiUrl.deleteQuotation,
        method: 'DELETE',
        data: payload,
      })

      return res.data
    },
  })

  return mutation
}
