import { route } from '@back/api/route'
import type { ReqBody, ResBody } from '@back/api/stripe/createPaymentLinkHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError, ReqBody>

export const useCreatePaymentLinkMutation = (): Res => {
  return useMutation<ResBody, AxiosError, ReqBody>({
    mutationKey: [queryKey.stripeCreatePaymentLink],
    mutationFn: async (body) => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.stripeCreatePaymentLink.url,
        method: route.stripeCreatePaymentLink.method,
        data: body,
      })

      return response.data
    },
  })
}
