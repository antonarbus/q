import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ResBody,
  SearchQuery,
} from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useGetUniqueDailyVisitorCountQuery = (props: SearchQuery): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
    queryKey: [
      queryKey.getUniqueDailyVisitors,
      { startDate: props.startDate, endDate: props.endDate },
    ],
    queryFn: async () => {
      const response = await axiosWithAuth<ResBody>({
        url: `${route.getUniqueDailyVisitors.url}?startDate=${props.startDate}&endDate=${props.endDate}`,
        method: route.getUniqueDailyVisitors.method,
      })

      return response.data
    },
    staleTime: Infinity,
  })

  return query
}
