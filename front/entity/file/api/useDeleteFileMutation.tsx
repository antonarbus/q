import { route } from '@back/api/route'
import type {
  ErrorResBody,
  UrlParam as Payload,
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
      const response = await axiosWithAuth<ResBody>({
        url: route.deleteFile.url(payload.id),
        method: route.deleteFile.method,
      })

      return response.data
    },
  })

  return mutation
}
