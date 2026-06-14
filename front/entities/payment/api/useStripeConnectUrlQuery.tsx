import { route } from '@back/api/route'
import type { ResBody } from '@back/api/stripe/stripeConnectUrlHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Payload = {
  returnUrl: string | null
}

type Res = UseMutationResult<ResBody, AxiosError, Payload>

export const useStripeConnectUrlMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError, Payload>({
    mutationFn: async (payload) => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.stripeConnectUrl.url,
        method: route.stripeConnectUrl.method,
        data: payload,
      })

      return response.data
    },
  })

  return mutation
}
