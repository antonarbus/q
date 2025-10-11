import { api } from '@back/api'
import type {
  ErrorResBody,
  ResBody,
} from '@back/api/bookmark/getBookmarkCategoriesHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useGetBookmarkCategoryListQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
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
