import type { ResBody } from '@back/api/quotation/getQuotationCategoriesRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { instance } from '@shared/instance'

export const useGetQuotationCategoriesQuery = (): UseQueryResult<
  ResBody,
  AxiosError<ResBody>
> => {
  const query = useQuery<ResBody, AxiosError<ResBody>>({
    queryKey: [queryKey.getQuotationCategories],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    retry: 0,
    queryFn: async () => {
      const res = await instance.axiosWithAuth<ResBody, AxiosResponse<ResBody>>(
        {
          url: apiUrl.getQuotationCategories,
          method: 'get',
        },
      )

      return res.data
    },
  })

  return query
}
