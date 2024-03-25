import { apiUrl } from '@server/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios from 'axios'
import type { ResBody, ReqBody as Payload } from 'server/api/loginRouter'
import { queryKey } from '@shared/consts/queryKey'

export const useLogInMutation = (): UseMutationResult<ResBody, Error, Payload, unknown> => {
  const query = useMutation({
    mutationKey: [queryKey.login],
    mutationFn: async ({ email, password }: Payload) => {
      const res = await axios<ResBody>({
        url: apiUrl.login,
        method: 'POST',
        data: { email, password },
      })

      return res.data
    },
  })

  return query
}
