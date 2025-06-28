import type { ResBody } from '@back/api/bookmark/getBookmarksHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

type Res = UseQueryResult<ResBody, AxiosError<ResBody>>

export const useGetBookmarksQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getBookmarks],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: false,
    queryFn: async ({ signal }) => {
      const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: api.getBookmarks.url,
        method: api.getBookmarks.method,
        signal,
      })

      return data
    },
  })

  return query
}
