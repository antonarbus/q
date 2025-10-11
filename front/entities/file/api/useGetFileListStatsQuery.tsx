import { api } from '@back/api'
import type { ErrorResBody, ResBody } from '@back/api/file/getFileListHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
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
      const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: api.getFileList.url,
        method: api.getFileList.method,
        withCredentials: true,
      })

      return data
    },
  })

  return query
}
