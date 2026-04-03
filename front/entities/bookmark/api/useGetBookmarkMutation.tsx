import { route } from '@back/api/route'
import type {
  ErrorResBody,
  UrlParam as Payload,
  ResBody,
} from '@back/api/bookmark/getBookmarkHandler'
import { axiosWithAuth } from '@front/shared/lib/axios'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useGetBookmarkMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.getBookmark],
    mutationFn: async (payload: Payload) => {
      const response = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>({
        url: route.getBookmark.url(payload.id),
        method: route.getBookmark.method,
      })

      return response.data
    },
  })

  return mutation
}
