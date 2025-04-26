import type { ResBody } from '@back/api/file/getFilesHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const useGetFilesStatsQuery = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getFilesStats],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    enabled: true,
    queryFn: async () => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: api.getFileList.url,
        method: api.getFileList.method,
        withCredentials: true,
      })

      return res.data
    },
  })

  return query
}
