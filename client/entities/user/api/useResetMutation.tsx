import { apiUrl } from '@server/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import type { ResBody, ReqBody as Payload } from 'server/api/resetRouter'
import { queryKey } from '@shared/consts/queryKey'

export const useResetMutation = (): UseMutationResult<ResBody, AxiosError<ResBody>, Payload> => {
  const query = useMutation({
    mutationKey: [queryKey.reset],
    mutationFn: async ({ email }: Payload) => {
      const res = await axios<ResBody>({
        url: apiUrl.reset,
        method: 'POST',
        data: { email },
      })

      return res.data
    },
  })

  return query
}
