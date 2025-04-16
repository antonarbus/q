import type { ResBody } from '@back/api/auth/logOut'
import { api } from '@back/shared/consts/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useLogOutMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  void
> => {
  const query = useMutation<ResBody, AxiosError<ResBody>>({
    mutationKey: [queryKey.logOut],
    mutationFn: async () => {
      const res = await axios<ResBody>({
        url: api.logOut.url,
        method: api.logOut.method,
      })

      return res.data
    },
  })

  return query
}
