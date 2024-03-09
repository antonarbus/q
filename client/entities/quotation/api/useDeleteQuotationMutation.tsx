import { apiUrl } from '@server/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import { axiosWithAuth } from '@entities/user'
import { queryKey } from '@shared/consts/queryKey'

// type Res = UseMutationResult<Receipt, Error>

type Payload = {
  id: string
}

export const useDeleteQuotationMutation = (): UseMutationResult<any, Error, Payload, unknown> => {
  const mutation = useMutation({
    mutationKey: [queryKey.deleteQuotation],
    mutationFn: async (payload: Payload) => {
      const res = await axiosWithAuth({
        url: apiUrl.deleteQuotation,
        method: 'DELETE',
        data: payload,
      })

      return res.data
    },
  })

  return mutation
}
