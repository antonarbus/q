import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/user/requestPasswordResetHandler'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import axios from 'axios'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useRequestUserPasswordResetMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.requestPasswordReset],
    mutationFn: async (payload: Payload) => {
      const response = await axios<ResBody>({
        url: route.requestPasswordReset.url,
        method: route.requestPasswordReset.method,
        data: {
          email: payload.email,
        },
      })

      return response.data
    },
  })

  return query
}
