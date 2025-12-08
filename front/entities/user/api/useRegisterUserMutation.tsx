import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/auth/registerHandler'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useRegisterUserMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.register],
    mutationFn: async ({ email, password }: Payload) => {
      const { data } = await axios<ResBody>({
        url: route.register.url,
        method: route.register.method,
        data: { email, password },
      })

      return data
    },
  })

  return query
}
