import type { ResBody } from '@back/api/quotation/getQuotationsRouter'
import { api } from '@back/shared/consts/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const useGetQuotationsQuery = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getQuotations],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: false,
    queryFn: async ({ signal }) => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: api.getQuotations,
        method: 'get',
        signal,
      })

      return res.data
    },
  })

  return query
}
