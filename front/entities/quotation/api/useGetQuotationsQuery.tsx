import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

type Res = UseQueryResult<ResBody, AxiosError<ResBody>>

export const useGetQuotationsQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getQuotations],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: false,
    queryFn: async ({ signal }) => {
      const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: api.getQuotationList.url,
        method: api.getQuotationList.method,
        signal,
      })

      return data
    },
  })

  return query
}
