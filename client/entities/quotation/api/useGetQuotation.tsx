import { type ReqBody, type ResBody } from '@server/api/getQuotationRouter'
import { type ReqBody as Quotation } from '@server/api/saveQuotationRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import { queryKey } from '@shared/consts/queryKey'

type Res = Partial<ResBody & Quotation>

type Props = {
  enabled: boolean
}

export const useGetQuotation = ({ enabled }: Props): UseQueryResult<Res, Error> => {
  const { id } = useParams()

  const query = useQuery({
    queryKey: [queryKey.getQuotation, { id }],
    queryFn: async () => {
      const quotationRes = await axios<Res, AxiosResponse<ResBody>, ReqBody>({
        method: 'POST',
        url: apiUrl.getQuotation,
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
    enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  })

  return query
}
