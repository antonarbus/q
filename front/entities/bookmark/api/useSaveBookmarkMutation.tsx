import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/bookmark/saveBookmarkRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { type AxiosResponse, type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useSaveBookmarkMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const query = useMutation({
    mutationKey: [queryKey.saveBookmark],
    mutationFn: async ({ item }: Payload) => {
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>(
        {
          url: apiUrl.saveBookmark,
          method: 'POST',
          data: { item },
        },
      )

      return res.data
    },
  })

  return query
}
