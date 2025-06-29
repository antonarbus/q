import type {
  ReqBody as Payload,
  ResBody,
} from '@back/api/bookmark/getBookmarkHandler'
import { api } from '@back/api'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosResponse, AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

type Res = UseMutationResult<ResBody, AxiosError<ResBody>, Payload>

export const useGetBookmarkMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ResBody>, Payload>({
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
