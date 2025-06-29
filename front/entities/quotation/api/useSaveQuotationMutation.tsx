import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/quotation/saveQuotationHandler'
import { api } from '@back/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import type { AxiosResponse, AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

export const saveQuotationMutationFn = async ({
  quotation,
}: Payload): Promise<ResBody> => {
  const { data } = await axiosWithAuth<
    ResBody,
    AxiosResponse<ResBody>,
    Payload
  >({
    url: api.saveQuotation.url,
    method: api.saveQuotation.method,
    data: { quotation },
  })

  return data
}

type Res = UseMutationResult<ResBody, AxiosError<ResBody>, Payload>

export const useSaveQuotationMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.saveQuotation],
    mutationFn: saveQuotationMutationFn,
  })

  return query
}
