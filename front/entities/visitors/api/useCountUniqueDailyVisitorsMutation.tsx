import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/visitors/countUniqueDailyVisitorsHandler'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { api } from '@back/api'

type Res = UseMutationResult<ResBody, AxiosError<ResBody>, Payload>

export const useCountUniqueDailyVisitorsMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
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
