import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ResBody,
} from '@back/api/user/getAccessTokenHandler'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError, type AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useGetUserAccessTokenQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
    queryKey: [queryKey.getAccessToken],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 1,
    enabled: false,
    queryFn: async () => {
      const response = await axios<ResBody, AxiosResponse<ResBody>>({
        url: route.getAccessToken.url,
        method: route.getAccessToken.method,
        withCredentials: true,
        timeout: 10000,
      })

      return response.data
    },
  })

  return query
}
