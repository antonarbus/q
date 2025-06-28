import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/auth/activateHandler'
import { api } from '@back/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

type Res = UseMutationResult<ResBody, AxiosError<ResBody>, Payload>

export const useActivateMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.activate],
    mutationFn: async ({ activationKey }: Payload) => {
      const { data } = await axios<ResBody>({
        url: api.activate.url,
        method: api.activate.method,
        data: { activationKey },
      })

      return data
    },
  })

  return query
}
