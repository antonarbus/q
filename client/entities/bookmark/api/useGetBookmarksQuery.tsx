import type { ResBody } from '@server/api/getItemsRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'
// import { asyncDelay } from '@shared/utils/delay'

export const useGetBookmarksQuery = (): UseQueryResult<ResBody, AxiosError<ResBody>> => {
  const query = useQuery({
    queryKey: [queryKey.getBookmarks],
    queryFn: async () => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: apiUrl.getBookmarks,
        method: 'GET',
      })
      // await asyncDelay(10000)

      return res.data
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: false,
    // gcTime: Infinity,
  })

  return query
}
