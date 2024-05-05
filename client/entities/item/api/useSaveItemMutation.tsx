import type { ResBody, ReqBody as Payload } from '@server/api/saveItemRouter'
import { apiUrl } from '@server/consts/apiUrl'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { type AxiosResponse, type AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const useSaveItemMutation = (): UseMutationResult<ResBody, AxiosError<ResBody>, Payload> => {
  const query = useMutation({
    mutationKey: [queryKey.saveItem],
    mutationFn: async ({ item }: Payload) => {
      throw 666
      const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, Payload>({
        url: apiUrl.saveItem,
        method: 'POST',
        data: { item },
      })

      return res.data
    },
  })

  return query
}
