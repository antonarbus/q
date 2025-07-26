import type {
  ResBody,
  ErrorResBody,
} from '@back/api/auth/getAccessTokenHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/const/queryKey'

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
      const { data } = await axios<ResBody, AxiosResponse<ResBody>>({
        url: api.getAccessToken.url,
        method: api.getAccessToken.method,
        withCredentials: true,
        timeout: 10000,
      })

      return data
    },
  })

  return query
}
