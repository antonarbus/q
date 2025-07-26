import type {
  ResBody,
  ReqBody as Payload,
  ErrorResBody,
} from '@back/api/auth/resetPasswordHandler'
import { api } from '@back/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useResetUserPasswordMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.resetPassword],
    mutationFn: async ({ resetPasswordKey, email, password }: Payload) => {
      const { data } = await axios<ResBody>({
        url: api.resetPassword.url,
        method: api.resetPassword.method,
        data: { resetPasswordKey, email, password },
      })

      return data
    },
  })

  return query
}
