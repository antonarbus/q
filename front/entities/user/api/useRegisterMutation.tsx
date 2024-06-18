import type { ResBody, ReqBody as Payload } from '@back/api/auth/registerRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useRegisterMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation({
    mutationKey: [queryKey.register],
    mutationFn: async ({ email, password }: Payload) => {
      const res = await axios<ResBody>({
        url: apiUrl.register,
        method: 'POST',
        data: { email, password },
      })

      return res.data
    },
  })

  return query
}
