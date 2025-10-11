import { api } from '@back/api'
import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/file/deleteFileHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

type Res = UseMutationResult<ResBody, AxiosError<ErrorResBody>, Payload>

export const useDeleteFileMutation = (): Res => {
  const mutation = useMutation<ResBody, AxiosError<ErrorResBody>, Payload>({
    mutationKey: [queryKey.deleteFile],
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosWithAuth<ResBody>({
        url: api.deleteFile.url,
        method: api.deleteFile.method,
        data: payload,
      })

      return data
    },
  })

  return mutation
}
