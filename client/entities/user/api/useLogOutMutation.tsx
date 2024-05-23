import type { ResBody } from '@server/api/auth/logOutRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useLogOutMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  void,
  unknown
> => {
  const query = useMutation({
    mutationKey: [queryKey.logOut],
    mutationFn: async () => {
      const res = await axios<ResBody>({
        url: apiUrl.logOut,
        method: 'GET',
      })

      return res.data
    },
  })

  return query
}
