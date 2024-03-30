import type { ResBody, ReqBody as Payload } from '@server/api/requestPasswordResetRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useRequestPasswordResetMutation = (): UseMutationResult<ResBody, AxiosError<ResBody>, Payload> => {
  const query = useMutation({
    mutationKey: [queryKey.requestPasswordReset],
    mutationFn: async ({ email }: Payload) => {
      const res = await axios<ResBody>({
        url: apiUrl.requestPasswordReset,
        method: 'POST',
        data: { email },
      })

      return res.data
    },
  })

  return query
}
