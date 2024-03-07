import type { ResBody } from '@server/api/getQuotationsRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useGetQuotations = (): UseQueryResult<ResBody, Error> => {
  const query = useQuery({
    queryKey: [queryKey.getQuotations],
    queryFn: async () => {
      const res = await axios<ResBody, AxiosResponse<ResBody>>({
        url: apiUrl.getQuotations,
        method: 'GET',
      })

      return res.data
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    // gcTime: Infinity,
    // retry: 0,
  })

  return query
}
