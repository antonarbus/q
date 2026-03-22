import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/user/resetPasswordHandler'
import { queryKey } from '@shared/lib/tanstack-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useResetUserPasswordMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.resetPassword],
    mutationFn: async (payload: Payload) => {
      const response = await axios<ResBody>({
        url: route.resetPassword.url,
        method: route.resetPassword.method,
        data: {
          resetPasswordKey: payload.resetPasswordKey,
          email: payload.email,
          password: payload.password,
        },
      })

      return response.data
    },
  })

  return query
}
