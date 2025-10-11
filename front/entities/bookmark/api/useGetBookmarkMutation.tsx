import { api } from '@back/api'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/bookmark/getBookmarkHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useGetBookmarkMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.getBookmark],
    mutationFn: async ({ id }: Payload) => {
      const { data } = await axiosWithAuth<
        ResBody,
        AxiosResponse<ResBody>,
        Payload
      >({
        url: api.getBookmark.url,
        method: api.getBookmark.method,
        data: { id },
      })

      return data
    },
  })

  return mutation
}
