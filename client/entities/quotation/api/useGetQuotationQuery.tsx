import { type ReqBody, type ResBody } from '@server/api/getQuotationRouter'
import { type ReqBody as Quotation } from '@server/api/saveQuotationRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

type Res = Partial<ResBody & Quotation>

export const useGetQuotationQuery = (): UseQueryResult<Res, Error> => {
  const { id } = useParams()

  const query = useQuery({
    queryKey: [queryKey.getQuotation, { id }],
    queryFn: async () => {
      const quotationRes = await axiosWithAuth<Res, AxiosResponse<ResBody>, ReqBody>({
        url: apiUrl.getQuotation,
        method: 'POST',
        data: {
          id: id ?? 'some non existing id',
        },
      })

      if (!quotationRes.data.jsonSignedUrl) {
        return quotationRes.data
      }

      const jsonRes = await axios<Quotation>({
        method: 'GET',
        url: quotationRes.data.jsonSignedUrl,
      })

      return {
        ...quotationRes.data,
        ...jsonRes.data,
      }
    },
    enabled: id !== undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
    // gcTime: 0,
    retry: 0,
  })

  return query
}
