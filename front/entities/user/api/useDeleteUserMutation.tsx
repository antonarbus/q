import type {
  ResBody,
  ReqBody as Payload,
} from '@back/api/user/deleteUserHandler'
import { api } from '@back/api'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { queryKey } from '@shared/const/queryKey'
import { axiosWithAuth } from '@shared/lib/axios'

type Res = UseMutationResult<ResBody, AxiosError<ResBody>, Payload>

export const useDeleteUserMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ResBody>, Payload>({
    mutationKey: [queryKey.deleteUser],
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosWithAuth<ResBody>({
        url: api.deleteUser.url,
        method: api.deleteUser.method,
        data: payload,
      })

      return data
    },
  })

  return mutation
}
