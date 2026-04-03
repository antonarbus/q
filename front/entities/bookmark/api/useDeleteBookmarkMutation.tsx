import { route } from '@back/api/route'
import type {
  ErrorResBody,
  UrlParam as Payload,
  ResBody,
} from '@back/api/bookmark/deleteBookmarkHandler'
import { axiosHolder } from '@front/shared/lib/axios'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useDeleteBookmarkMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.deleteBookmark],
    mutationFn: async (payload: Payload) => {
      const response = await axiosHolder.axiosWithAuth<ResBody>({
        url: route.deleteBookmark.url(payload.id),
        method: route.deleteBookmark.method,
        data: payload,
      })

      return response.data
    },
  })

  return mutation
}
