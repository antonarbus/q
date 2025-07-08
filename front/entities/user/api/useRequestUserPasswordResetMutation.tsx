import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/auth/requestPasswordResetHandler'
import { api } from '@back/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'

type Res = UseMutationResult<ResBody, AxiosError<ResBody>, Payload>

export const useRequestUserPasswordResetMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
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
