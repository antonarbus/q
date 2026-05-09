import { route } from '@back/api/route'
import type { ResBody } from '@back/api/stripe/stripeConnectUrlHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError>

export const useStripeConnectUrlQuery = (): Res => {
  return useQuery<ResBody, AxiosError>({
    queryKey: ['stripeConnectUrl'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    retry: 0,
    enabled: false,
    queryFn: async () => {
      const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.stripeConnectUrl.url,
        method: route.stripeConnectUrl.method,
      })

      return response.data
    },
  })
}
