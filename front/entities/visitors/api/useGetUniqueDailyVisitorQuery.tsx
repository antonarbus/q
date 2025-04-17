import type {
  ResBody,
  SearchQuery,
} from '@back/api/visitors/getUniqueDailyVisitors'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const useGetUniqueDailyVisitorQuery = ({
  startDate,
  endDate,
}: SearchQuery): UseQueryResult<ResBody, AxiosError<ResBody>> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getUniqueDailyVisitors, { startDate, endDate }],
    queryFn: async () => {
      const res = await axiosWithAuth<ResBody>({
        url: `${api.getUniqueDailyVisitors.url}?startDate=${startDate}&endDate=${endDate}`,
        method: api.getUniqueDailyVisitors.method,
      })

      return res.data
    },
    staleTime: Infinity,
  })

  return query
}
