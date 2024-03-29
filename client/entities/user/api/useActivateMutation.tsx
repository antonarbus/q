import { apiUrl } from '@server/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import type { ResBody, ReqBody as Payload } from 'server/api/activateRouter'
import { queryKey } from '@shared/consts/queryKey'

export const useActivateMutation = (): UseMutationResult<ResBody, AxiosError<ResBody>, Payload> => {
  const query = useMutation({
    mutationKey: [queryKey.activate],
    mutationFn: async ({ activationKey }: Payload) => {
      const res = await axios<ResBody>({
        url: apiUrl.activate,
        method: 'POST',
        data: { activationKey },
      })

      return res.data
    },
  })

  return query
}
