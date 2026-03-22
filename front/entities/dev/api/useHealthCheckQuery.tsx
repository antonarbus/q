import { route } from '@back/api/route'
import type { ErrorResBody, ResBody } from '@back/api/dev/healthCheckHandler'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError, type AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useHealthCheckQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
    queryKey: [queryKey.healthCheck],
    retry: 1,
    retryDelay: 3000,
    queryFn: async () => {
      const response = await axios<ResBody, AxiosResponse<ResBody>>({
        url: route.health.url,
        method: route.health.method,
        withCredentials: true,
        timeout: 30000,
      })

      return response.data
    },
  })

  return query
}
