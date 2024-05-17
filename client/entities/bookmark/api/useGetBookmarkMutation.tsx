import { type ReqBody as Payload, type ResBody } from '@server/api/getItemRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import { type AxiosResponse, type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useGetBookmarkMutation = (): UseMutationResult<ResBody, AxiosError<ResBody>, Payload> => {
  const mutation = useMutation({
    mutationKey: [queryKey.getBookmark],
    mutationFn: async ({ id }: Payload) => {
      const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>({
        url: apiUrl.getBookmark,
        method: 'POST',
        data: { id },
      })

      return data
    },
  })

  return mutation
}
