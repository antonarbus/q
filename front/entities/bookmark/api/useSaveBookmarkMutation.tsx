import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/bookmark/saveBookmarkRouter'
import { apiUrl } from '@back/shared/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import type { AxiosResponse, AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const useSaveBookmarkMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.saveBookmark],
    mutationFn: async ({ item }: Payload) => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>(
        {
          url: apiUrl.saveBookmark,
          method: 'post',
          data: { item },
        },
      )

      return res.data
    },
  })

  return query
}
