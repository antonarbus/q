import type { ResBody } from '@back/api/visitors/getUniqueDailyVisitorsRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const useGetUniqueDailyVisitorQuery = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getUniqueDailyVisitors],
    queryFn: async () => {
      const res = await axiosWithAuth<ResBody>({
        url: apiUrl.getUniqueDailyVisitors,
        method: 'get',
      })

      return res.data
    },
  })

  return query
}
