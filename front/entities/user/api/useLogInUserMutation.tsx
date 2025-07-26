import type {
  ResBody,
  ReqBody as Payload,
  ErrorResBody,
} from '@back/api/auth/logInHandler'
import { api } from '@back/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

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
