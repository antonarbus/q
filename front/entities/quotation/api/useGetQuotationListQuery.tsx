import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ResBody,
} from '@back/api/quotation/getQuotationListHandler'
import { axiosWithAuth } from '@front/shared/lib/axios'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useGetQuotationListQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
    queryKey: [queryKey.getQuotationList],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: false,
    queryFn: async ({ signal }) => {
      const response = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.getQuotationList.url,
        method: route.getQuotationList.method,
        signal,
      })

      return response.data
    },
  })

  return query
}
