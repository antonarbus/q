import type { ResBody } from '@back/api/auth/getAccessTokenRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useGetAccessTokenQuery = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getAccessToken],
    queryFn: async () => {
      const res = await axios<ResBody, AxiosResponse<ResBody>>({
        url: apiUrl.getAccessToken,
        method: 'get',
        withCredentials: true,
        timeout: 5000,
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
