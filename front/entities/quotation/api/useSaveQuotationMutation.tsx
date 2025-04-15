import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/quotation/saveQuotationRouter'
import { api } from '@back/shared/consts/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import type { AxiosResponse, AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const saveQuotationMutationFn = async ({
  quotation,
}: Payload): Promise<ResBody> => {
  const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>({
    url: api.saveQuotation,
    method: 'post',
    data: { quotation },
  })

  return res.data
}

export const useSaveQuotationMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.saveQuotation],
    mutationFn: saveQuotationMutationFn,
  })

  return query
}
