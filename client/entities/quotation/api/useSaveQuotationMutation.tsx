import type { ResBody, ReqBody as Payload } from '@server/api/saveQuotationRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { type AxiosResponse, type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useSaveQuotationMutation = (): UseMutationResult<ResBody, AxiosError<ResBody>, Payload> => {
  const query = useMutation({
    mutationKey: [queryKey.saveQuotation],
    mutationFn: async ({ quotation, items }: Payload) => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>({
        url: apiUrl.saveQuotation,
        method: 'POST',
        data: { quotation, items },
      })

      return res.data
    },
  })

  return query
}
