import type {
  SearchQuery,
  ResBody,
  ErrorResBody,
} from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useGetUniqueDailyVisitorCountQuery = ({
  startDate,
  endDate,
}: SearchQuery): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
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
