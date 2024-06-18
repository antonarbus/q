import type { ResBody } from '@back/api/bookmark/getBookmarkCategoriesRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useGetBookmarkCategoriesQuery = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery({
    queryKey: [queryKey.getBookmarkCategories],
    queryFn: async () => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: apiUrl.getBookmarkCategories,
        method: 'GET',
      })

      return res.data
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    // enabled: false,
    // gcTime: Infinity,
  })

  return query
}
