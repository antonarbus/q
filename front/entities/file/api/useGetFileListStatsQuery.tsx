import { route } from '@back/api/route'
import type { ErrorResBody, ResBody } from '@back/api/file/getFileListHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useGetFileListStatsQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
    queryKey: [queryKey.getFileListStats],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: true,
    queryFn: async () => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.getFileList.url,
        method: route.getFileList.method,
        withCredentials: true,
      })

      return response.data
    },
  })

  return query
}
