import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/user/activateHandler'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useActivateUserMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.activate],
    mutationFn: async (payload: Payload) => {
      const response = await axios<ResBody>({
        url: route.activate.url,
        method: route.activate.method,
        data: {
          activationKey: payload.activationKey,
        },
      })

      return response.data
    },
  })

  return query
}
