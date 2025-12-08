import { apiRoute } from '@back/api/apiRoute'
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
        url: apiRoute.register.url,
        method: apiRoute.register.method,
        data: { email, password },
      })

      return data
    },
  })

  return query
}
