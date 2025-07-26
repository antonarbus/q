import type {
  ResBody,
  ReqBody as Payload,
  ErrorResBody,
} from '@back/api/bookmark/deleteBookmarkHandler'
import { api } from '@back/api'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useDeleteBookmarkMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.deleteBookmark],
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosWithAuth<ResBody>({
        url: api.deleteBookmark.url,
        method: api.deleteBookmark.method,
        data: payload,
      })

      return data
    },
  })

  return mutation
}
