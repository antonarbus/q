import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/stripe/subscriptionCheckoutHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useSubscriptionCheckoutMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.stripeSubscriptionCheckout],
    mutationFn: async (payload) => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>({
        url: route.stripeSubscriptionCheckout.url,
        method: route.stripeSubscriptionCheckout.method,
        data: payload,
      })

      return response.data
    },
  })

  return mutation
}
