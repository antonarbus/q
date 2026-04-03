import { route } from '@back/api/route'
import type { ErrorResBody, ReqBody as Payload, ResBody } from '@back/api/user/registerUserHandler'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import axios from 'axios'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useRegisterUserMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.register],
    mutationFn: async (payload: Payload) => {
      const response = await axios<ResBody>({
        url: route.registerUser.url,
        method: route.registerUser.method,
        data: {
          email: payload.email,
          password: payload.password,
        },
      })

      return response.data
    },
  })

  return query
}
