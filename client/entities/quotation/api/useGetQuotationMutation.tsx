import { type ReqBody as Payload, type ResBody } from '@server/api/getQuotationRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import axios, { type AxiosResponse, type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'

export const useGetQuotationMutation = (): UseMutationResult<ResBody, AxiosError<ResBody>, Payload> => {
  const mutation = useMutation({
    mutationKey: [queryKey.getQuotation],
    mutationFn: async ({ id }: Payload) => {
      const quotationRes = await axios<ResBody, AxiosResponse<ResBody>, Payload>({
        url: apiUrl.getQuotation,
        method: 'POST',
        data: { id },
      })

      if (!quotationRes.data.jsonSignedUrl) {
        return quotationRes.data
      }

      const jsonRes = await axios<ResBody>({
        method: 'GET',
        url: quotationRes.data.jsonSignedUrl,
      })

      return {
        ...quotationRes.data,
        ...jsonRes.data,
      }
    },
  })

  return mutation
}
