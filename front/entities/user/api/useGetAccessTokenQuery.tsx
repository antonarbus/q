import type { ResBody } from '@back/api/auth/getAccessTokenHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useGetAccessTokenQuery = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getAccessToken],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 1,
    enabled: false,
    queryFn: async () => {
      const res = await axios<ResBody, AxiosResponse<ResBody>>({
        url: api.getAccessToken.url,
        method: api.getAccessToken.method,
        withCredentials: true,
        timeout: 10000,
      })

      return res.data
    },
  })

  return query
}
