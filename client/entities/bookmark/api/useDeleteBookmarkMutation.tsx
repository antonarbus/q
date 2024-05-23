import type {
  ResBody,
  ReqBody as Payload,
} from '@server/api/bookmark/deleteBookmarkRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useDeleteBookmarkMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const mutation = useMutation({
    mutationKey: [queryKey.deleteBookmark],
    mutationFn: async (payload: Payload) => {
      const res = await axiosWithAuth<ResBody>({
        url: apiUrl.deleteBookmark,
        method: 'DELETE',
        data: payload,
      })

      return res.data
    },
  })

  return mutation
}
