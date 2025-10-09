import { api } from '@back/api'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/visitors/countUniqueDailyVisitorsHandler'
import { queryKey } from '@shared/const/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useCountUniqueDailyVisitorsMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.countUniqueDailyVisitors],
    mutationFn: async ({ date, isNew }: Payload) => {
      const { data } = await axios<ResBody>({
        url: api.countUniqueDailyVisitors.url,
        method: api.countUniqueDailyVisitors.method,
        data: { date, isNew },
      })

      return data
    },
  })

  return query
}
