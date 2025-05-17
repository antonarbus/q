import type { ResBody } from '@back/api/dev/healthCheckHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useHealthCheck = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.healthCheck],
    retry: 1,
    retryDelay: 3000,
    queryFn: async () => {
      const res = await axios<ResBody, AxiosResponse<ResBody>>({
        url: api.health.url,
        method: api.health.method,
        withCredentials: true,
        timeout: 30000,
      })

      return res.data
    },
  })

  return query
}
