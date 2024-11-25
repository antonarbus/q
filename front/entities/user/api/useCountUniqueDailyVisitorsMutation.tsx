import type { ResBody } from '@back/api/user/incrementUniqueDailyVisitor'
import { apiUrl } from '@back/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useCountUniqueDailyVisitorsMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useMutation<ResBody, AxiosError<ResBody>, unknown>({
    mutationKey: [queryKey.countUniqueDailyVisitors],
    mutationFn: async () => {
      const res = await axios<ResBody>({
        url: apiUrl.countUniqueDailyVisitors,
        method: 'post',
        data: {},
      })

      return res.data
    },
  })

  return query
}
