import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/user/logInHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import { queryKey } from '@shared/lib/tanstack-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useLogInUserMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.logIn],
    mutationFn: async (payload: Payload) => {
      const response = await axiosWithAuth<ResBody>({
        url: route.logIn.url,
        method: route.logIn.method,
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
