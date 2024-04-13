import type { ResBody, ReqBody as Payload } from '@server/api/deleteItemRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useDeleteItemMutation = (): UseMutationResult<ResBody, Error, Payload, unknown> => {
  const mutation = useMutation({
    mutationKey: [queryKey.deleteItem],
    mutationFn: async (payload: Payload) => {
      const res = await axiosWithAuth<ResBody>({
        url: apiUrl.deleteItem,
        method: 'DELETE',
        data: payload,
      })

      return res.data
    },
  })

  return mutation
}
