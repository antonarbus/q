import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/quotation/saveQuotationRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { type AxiosResponse, type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useSaveQuotationMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.saveQuotation],
    mutationFn: async ({ quotation }: Payload) => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>(
        {
          url: apiUrl.saveQuotation,
          method: 'POST',
          data: { quotation },
        },
      )

      return res.data
    },
  })

  return query
}
