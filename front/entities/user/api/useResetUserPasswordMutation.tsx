import { api } from '@back/api'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/auth/resetPasswordHandler'
import { queryKey } from '@shared/const/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

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
