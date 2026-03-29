import { route } from '@back/api/route'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/bookmark/saveBookmarkHandler'
import { axiosWithAuth } from '@front/shared/lib/axios'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useSaveBookmarkMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.saveBookmark],
    mutationFn: async (payload: Payload) => {
      const response = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>({
        url: route.saveBookmark.url,
        method: route.saveBookmark.method,
        data: {
          bookmark: payload.bookmark,
        },
      })

      return response.data
    },
  })

  return query
}
