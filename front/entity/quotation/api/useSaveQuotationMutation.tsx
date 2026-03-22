import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/quotation/saveQuotationHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import { queryKey } from '@shared/lib/tanstack-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

export const saveQuotationMutationFn = async (
  payload: Payload,
): Promise<ResBody> => {
  const response = await axiosWithAuth<
    ResBody,
    AxiosResponse<ResBody>,
    Payload
  >({
    url: route.saveQuotation.url,
    method: route.saveQuotation.method,
    data: {
      quotation: payload.quotation,
    },
  })

  return response.data
}

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useSaveQuotationMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.saveQuotation],
    mutationFn: saveQuotationMutationFn,
  })

  return query
}
