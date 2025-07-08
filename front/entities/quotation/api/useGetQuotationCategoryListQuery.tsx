import type { ResBody } from '@back/api/quotation/getQuotationCategories'
import { api } from '@back/api'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

type Res = UseQueryResult<ResBody, AxiosError<ResBody>>

export const useGetQuotationCategoryListQuery = (): Res => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getQuotationCategoryList],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    queryFn: async () => {
      const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: api.getUniqueQuotationCategoryList.url,
        method: api.getUniqueQuotationCategoryList.method,
      })

      return data
    },
  })

  return query
}
