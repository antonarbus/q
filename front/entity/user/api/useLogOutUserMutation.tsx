import { route } from '@back/api/route'
import type { ErrorResBody, ResBody } from '@back/api/user/logOutHandler'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, void>

export const useLogOutUserMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>>({
    mutationKey: [queryKey.logOut],
    mutationFn: async () => {
      const response = await axios<ResBody>({
        url: route.logOut.url,
        method: route.logOut.method,
      })

      return response.data
    },
  })

  return query
}
