import { api } from '@back/api'
import type { ErrorResBody, ResBody } from '@back/api/auth/logOutHandler'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, void>

export const useLogOutUserMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>>({
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
