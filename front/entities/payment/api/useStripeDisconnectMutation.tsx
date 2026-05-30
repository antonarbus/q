import { route } from '@back/api/route'
import type { ErrorResBody, ResBody } from '@back/api/stripe/stripeDisconnectHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, void>

export const useStripeDisconnectMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>>({
    mutationKey: [queryKey.stripeDisconnect],
    mutationFn: async () => {
      const response = await axiosHolder.axiosWithAuth<ResBody>({
        url: route.stripeDisconnect.url,
        method: route.stripeDisconnect.method,
      })

      return response.data
    },
  })

  return mutation
}
