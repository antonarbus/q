import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/quotation/saveQuotationHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

export const saveQuotationMutationFn = async (payload: Payload): Promise<ResBody> => {
  const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>({
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
