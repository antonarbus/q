import type {
  ResBody,
  ReqBody as Payload,
  ErrorResBody,
} from '@back/api/bookmark/saveBookmarkHandler'
import { api } from '@back/api'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import type { AxiosResponse, AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useSaveBookmarkMutation = (): Res => {
  const query = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.saveBookmark],
    mutationFn: async ({ item }: Payload) => {
      const { data } = await axiosWithAuth<
        ResBody,
        AxiosResponse<ResBody>,
        Payload
      >({
        url: api.saveBookmark.url,
        method: api.saveBookmark.method,
        data: { item },
      })

      return data
    },
  })

  return query
}
