import type { ResBody, ReqBody as Payload } from '@server/api/auth/logInRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useLogInMutation = (): UseMutationResult<ResBody, AxiosError<ResBody>, Payload> => {
  const query = useMutation({
    mutationKey: [queryKey.logIn],
    mutationFn: async ({ email, password }: Payload) => {
      const res = await axios<ResBody>({
        url: apiUrl.logIn,
        method: 'POST',
        data: { email, password },
      })

      return res.data
    },
  })

  return query
}
