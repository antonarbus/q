import type {
  ResBody,
  SearchQuery,
} from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

type Res = UseQueryResult<ResBody, AxiosError<ResBody>>

export const useGetUniqueDailyVisitorQuery = ({
  startDate,
  endDate,
}: SearchQuery): Res => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getUniqueDailyVisitors, { startDate, endDate }],
    queryFn: async () => {
      const { data } = await axiosWithAuth<ResBody>({
        url: `${api.getUniqueDailyVisitors.url}?startDate=${startDate}&endDate=${endDate}`,
        method: api.getUniqueDailyVisitors.method,
      })

      return data
    },
    staleTime: Infinity,
  })

  return query
}
