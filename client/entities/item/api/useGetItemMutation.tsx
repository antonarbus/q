import { type ReqBody as Payload, type ResBody } from '@server/api/getItemRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import { type AxiosResponse, type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useGetItemMutation = (): UseMutationResult<ResBody, AxiosError<ResBody>, Payload> => {
  const mutation = useMutation({
    mutationKey: [queryKey.getItem],
    mutationFn: async ({ id }: Payload) => {
      const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>({
        url: apiUrl.getItem,
        method: 'POST',
        data: { id },
      })

      return data
    },
  })

  return mutation
}
