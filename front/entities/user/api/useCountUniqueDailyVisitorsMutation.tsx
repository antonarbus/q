import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/user/incrementUniqueDailyVisitor'
import { apiUrl } from '@back/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useCountUniqueDailyVisitorsMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.countUniqueDailyVisitors],
    mutationFn: async ({ date, isNew }: Payload) => {
      const res = await axios<ResBody>({
        url: apiUrl.countUniqueDailyVisitors,
        method: 'post',
        data: { date, isNew },
      })

      return res.data
    },
  })

  return query
}
