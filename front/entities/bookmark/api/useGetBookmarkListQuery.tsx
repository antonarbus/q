import { route } from '@back/api/route'
import type { ErrorResBody, ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useGetBookmarkListQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
    queryKey: [queryKey.getBookmarkList],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: false,
    queryFn: async ({ signal }) => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.getBookmarkList.url,
        method: route.getBookmarkList.method,
        signal,
      })

      return response.data
    },
  })

  return query
}
