import type { ResBody, ErrorResBody } from '@back/api/dev/healthCheckHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/const/queryKey'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useHealthCheckQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
    queryKey: [queryKey.healthCheck],
    retry: 1,
    retryDelay: 3000,
    queryFn: async () => {
      const { data } = await axios<ResBody, AxiosResponse<ResBody>>({
        url: api.health.url,
        method: api.health.method,
        withCredentials: true,
        timeout: 30000,
      })

      return data
    },
  })

  return query
}
