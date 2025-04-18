import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/bookmark/deleteBookmarkHandler'
import { api } from '@back/api'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const useDeleteBookmarkMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const mutation = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.deleteBookmark],
    mutationFn: async (payload: Payload) => {
      const res = await axiosWithAuth<ResBody>({
        url: api.deleteBookmark.url,
        method: api.deleteBookmark.method,
        data: payload,
      })

      return res.data
    },
  })

  return mutation
}
