import type {
  ResBody,
  ReqBody as Payload,
} from '@server/api/auth/resetPasswordRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useResetPasswordMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation({
    mutationKey: [queryKey.resetPassword],
    mutationFn: async ({ resetPasswordKey, email, password }: Payload) => {
      const res = await axios<ResBody>({
        url: apiUrl.resetPassword,
        method: 'POST',
        data: { resetPasswordKey, email, password },
      })

      return res.data
    },
  })

  return query
}
