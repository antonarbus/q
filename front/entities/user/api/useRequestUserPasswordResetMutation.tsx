import { api } from '@back/api'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/auth/requestPasswordResetHandler'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useRequestUserPasswordResetMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.requestPasswordReset],
    mutationFn: async ({ email }: Payload) => {
      const { data } = await axios<ResBody>({
        url: api.requestPasswordReset.url,
        method: api.requestPasswordReset.method,
        data: { email },
      })

      return data
    },
  })

  return query
}
