import { type ResBody } from '@server/api/deleteQuotationRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

// type Res = UseMutationResult<Receipt, Error>

type Payload = {
  id: string
}

export const useDeleteQuotationMutation = (): UseMutationResult<ResBody, Error, Payload, unknown> => {
  const mutation = useMutation({
    mutationKey: [queryKey.deleteQuotation],
    mutationFn: async (payload: Payload) => {
      const res = await axiosWithAuth<ResBody>({
        url: apiUrl.deleteQuotation,
        method: 'DELETE',
        data: payload,
      })

      return res.data
    },
  })

  return mutation
}
