import type { ResBody } from '@back/api/user/getUsersHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const useGetUsersQuery = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getUsers],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    // enabled: false,
    queryFn: async ({ signal }) => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: api.getUsers.url,
        method: api.getUsers.method,
        signal,
      })

      return res.data
    },
  })

  return query
}
