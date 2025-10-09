import { api } from '@back/api'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/auth/logInHandler'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useLogInUserMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.logIn],
    mutationFn: async ({ email, password }: Payload) => {
      const { data } = await axiosWithAuth<ResBody>({
        url: api.logIn.url,
        method: api.logIn.method,
        data: { email, password },
      })

      return data
    },
  })

  return query
}
