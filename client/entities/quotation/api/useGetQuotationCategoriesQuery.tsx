import type { ResBody } from '@server/api/getQuotationCategoriesRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type AxiosError, type AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useGetQuotationCategoriesQuery = (): UseQueryResult<ResBody, AxiosError<ResBody>> => {
  const query = useQuery({
    queryKey: [queryKey.getQuotationCategories],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    queryFn: async () => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
        url: apiUrl.getQuotationCategories,
        method: 'GET',
      })

      return res.data
    },
  })

  return query
}
