import { api } from '@back/api'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/quotation/saveQuotationHandler'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

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

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useSaveQuotationMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.saveQuotation],
    mutationFn: saveQuotationMutationFn,
  })

  return query
}
