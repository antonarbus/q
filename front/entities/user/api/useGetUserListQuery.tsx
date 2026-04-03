import { route } from '@back/api/route'
import type { ErrorResBody, ResBody } from '@back/api/user/getUserListHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useGetUserListQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
    queryKey: [queryKey.getUserList],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    // enabled: false,
    queryFn: async ({ signal }) => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.getUserList.url,
        method: route.getUserList.method,
        signal,
      })

      return response.data
    },
  })

  return query
}
