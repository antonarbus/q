import { route } from '@back/api/route'
import type { ErrorResBody, ResBody } from '@back/api/stripe/subscriptionCheckoutHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, void>

export const useSubscriptionCheckoutMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>>({
    mutationKey: [queryKey.stripeSubscriptionCheckout],
    mutationFn: async () => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.stripeSubscriptionCheckout.url,
        method: route.stripeSubscriptionCheckout.method,
      })

      return response.data
    },
  })

  return mutation
}
