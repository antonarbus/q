import type { ResBody } from '@server/api/getQuotationsRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useGetQuotationsQuery = (): UseQueryResult<ResBody, AxiosError<ResBody>> => {
  const query = useQuery({
    queryKey: [queryKey.getQuotations],
    queryFn: async () => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: apiUrl.getQuotations,
        method: 'GET',
      })

      return res.data
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    // enabled: Boolean(accessTokenSignal.value),
    // gcTime: Infinity,
  })

  return query
}
