import type {
  ResBody,
  ReqBody as Payload,
  ErrorResBody,
} from '@back/api/auth/registerHandler'
import { api } from '@back/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useRegisterUserMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.register],
    mutationFn: async ({ email, password }: Payload) => {
      const { data } = await axios<ResBody>({
        url: api.register.url,
        method: api.register.method,
        data: { email, password },
      })

      return data
    },
  })

  return query
}
