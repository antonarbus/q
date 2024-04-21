import type { ResBody } from '@server/api/getAccessTokenRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useGetAccessTokenQuery = (): UseQueryResult<ResBody, AxiosError<ResBody>> => {
  const query = useQuery({
    queryKey: [queryKey.getAccessToken],
    queryFn: async () => {
      const res = await axios<ResBody, AxiosResponse<ResBody>>({
        url: apiUrl.getAccessToken,
        method: 'GET',
        withCredentials: true,
      })

      return res.data
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: false,
  })

  return query
}
