import type {
  ReqBody as Payload,
  ResBody,
} from '@back/api/bookmark/getBookmark'
import { api } from '@back/shared/consts/api'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosResponse, AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const useGetBookmarkMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
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
