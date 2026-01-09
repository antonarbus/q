import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/user/registerUserHandler'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useRegisterUserMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.register],
    mutationFn: async ({ email, password }: Payload) => {
      const response = await axios<ResBody>({
        url: route.registerUser.url,
        method: route.registerUser.method,
        data: { email, password },
      })

      return response.data
    },
  })

  return query
}
