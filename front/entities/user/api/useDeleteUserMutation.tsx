import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/user/deleteUserRouter'
import { apiUrl } from '@back/consts/apiUrl'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/consts/queryKey'
import { axiosWithAuth } from '@shared/lib/axiosWithAuth'

export const useDeleteUserMutation = (): UseMutationResult<
  ResBody,
  AxiosError<ResBody>,
  Payload
> => {
  const mutation = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.deleteUser],
    mutationFn: async (payload: Payload) => {
      const res = await axiosWithAuth<ResBody>({
        url: apiUrl.deleteUser,
        method: 'delete',
        data: payload,
      })

      return res.data
    },
  })

  return mutation
}
