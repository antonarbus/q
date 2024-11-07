import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/quotation/saveQuotationRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import type { AxiosResponse, AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { instance } from '@shared/instance'

export const useSaveQuotationMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.saveQuotation],
    mutationFn: async ({ quotation }: Payload) => {
      const res = await instance.axiosWithAuth<
        ResBody,
        AxiosResponse<ResBody>,
        Payload
      >({
        url: apiUrl.saveQuotation,
        method: 'post',
        data: { quotation },
      })

      return res.data
    },
  })

  return query
}
