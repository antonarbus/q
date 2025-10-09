import { api } from '@back/api'
import type {
  ErrorResBody,
  ResBody,
  SearchQuery,
} from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

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
