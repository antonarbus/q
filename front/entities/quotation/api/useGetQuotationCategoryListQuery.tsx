import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ResBody,
} from '@back/api/quotation/getQuotationCategoriesHandler'
import { axiosWithAuth } from '@front/shared/lib/axios'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseQueryResult<ResBody, AxiosError<ErrorResBody>>

export const useGetQuotationCategoryListQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ErrorResBody>>({
    queryKey: [queryKey.getQuotationCategoryList],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    queryFn: async () => {
      const response = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: route.getUniqueQuotationCategoryList.url,
        method: route.getUniqueQuotationCategoryList.method,
      })

      return response.data
    },
  })

  return query
}
