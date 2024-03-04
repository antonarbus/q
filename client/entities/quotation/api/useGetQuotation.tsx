import { type ReqBody, type ResBody } from '@server/api/getQuotationRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import axios, { type AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import { queryKey } from '@shared/consts/queryKey'

export const useGetQuotation = (): UseQueryResult<ResBody | undefined, Error> => {
  const { id } = useParams()

  const query = useQuery({
    queryKey: [queryKey.getQuotation, { id }],
    queryFn: async () => {
      const quotationRes = await axios<ResBody, AxiosResponse<ResBody>, ReqBody>({
        method: 'POST',
        url: apiUrl.getQuotation,
        data: {
          id: id ?? 'some non existing id',
        },
      })

      if (quotationRes.data.jsonSignedUrl === null) return

      const jsonRes = await axios<ResBody, AxiosResponse<ResBody>, ReqBody>({
        method: 'GET',
        url: quotationRes.data.jsonSignedUrl,
      })

      return jsonRes.data
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  })

  return query
}
