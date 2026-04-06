import { route } from '@back/api/route'
import type { ResBody } from '@back/api/stripe/stripeAccountStatusHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError>

export const useStripeAccountStatusQuery = (): Res => {
  return useQuery<ResBody, AxiosError>({
    queryKey: [queryKey.stripeAccountStatus],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    queryFn: async () => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.stripeAccountStatus.url,
        method: route.stripeAccountStatus.method,
      })

      return response.data
    },
  })
}
