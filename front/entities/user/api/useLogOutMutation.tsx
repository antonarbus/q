import type { ResBody } from '@back/api/auth/logOutHandler'
import { api } from '@back/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

type Res = UseMutationResult<ResBody, AxiosError<ResBody>, void>

export const useLogOutMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ResBody>>({
    mutationKey: [queryKey.logOut],
    mutationFn: async () => {
      const { data } = await axios<ResBody>({
        url: api.logOut.url,
        method: api.logOut.method,
      })

      return data
    },
  })

  return query
}
