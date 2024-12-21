import type {
  ResBody,
  SearchQuery,
} from '@back/api/visitors/getUniqueDailyVisitorsRouter'
import { apiUrl } from '@back/consts/apiUrl'
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
        url: `${apiUrl.getUniqueDailyVisitors}?startDate=${startDate}&endDate=${endDate}`,
        method: 'get',
      })

      return res.data
    },
    staleTime: Infinity,
  })

  return query
}
