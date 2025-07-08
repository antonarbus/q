import type { ResBody } from '@back/api/bookmark/getBookmarkCategoriesHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

type Res = UseQueryResult<ResBody, AxiosError<ResBody>>

export const useGetBookmarkCategoryListQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getBookmarkCategoryList],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    queryFn: async () => {
      const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: api.getUniqueBookmarkCategoryList.url,
        method: api.getUniqueBookmarkCategoryList.method,
      })

      return data
    },
  })

  return query
}
