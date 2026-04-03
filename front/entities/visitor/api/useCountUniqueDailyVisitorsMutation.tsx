import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/visitors/countUniqueDailyVisitorsHandler'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import axios from 'axios'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useCountUniqueDailyVisitorsMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.countUniqueDailyVisitors],
    mutationFn: async (payload: Payload) => {
      const response = await axios<ResBody>({
        url: route.countUniqueDailyVisitors.url,
        method: route.countUniqueDailyVisitors.method,
        data: {
          isNew: payload.isNew,
        },
      })

      return response.data
    },
  })

  return query
}
