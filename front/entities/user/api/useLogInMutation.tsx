import type { ResBody, ReqBody as Payload } from '@back/api/auth/logInRouter'
import { api } from '@back/shared/consts/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useLogInMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.logIn],
    mutationFn: async ({ email, password }: Payload) => {
      const res = await axios<ResBody>({
        url: api.logIn,
        method: 'post',
        data: { email, password },
      })

      return res.data
    },
  })

  return query
}
