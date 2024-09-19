import type { ResBody } from '@back/api/bookmark/getBookmarksRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'
// import { asyncDelay } from '@shared/utils/delay'

export const useGetBookmarksQuery = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getBookmarks],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: false,
    queryFn: async ({ signal }) => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: apiUrl.getBookmarks,
        method: 'get',
        signal,
      })

      return res.data
    },
  })

  return query
}
