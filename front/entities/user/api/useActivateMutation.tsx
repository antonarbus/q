import type { ResBody, ReqBody as Payload } from '@back/api/auth/activateRouter'
import { api } from '@back/shared/consts/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useActivateMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.activate],
    mutationFn: async ({ activationKey }: Payload) => {
      const res = await axios<ResBody>({
        url: api.activate,
        method: 'post',
        data: { activationKey },
      })

      return res.data
    },
  })

  return query
}
