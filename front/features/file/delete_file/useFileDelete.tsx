import { useDeleteFileMutation } from '@entities/quotation'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/consts/queryKey'
import { useCallback } from 'react'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  fileName: string
  fileSize: number
}

type Res = {
  onDeleteClick: (e: React.MouseEvent) => void
  isSuccess: boolean
  isPending: boolean
}

export const useFileDelete = ({ fileName }: Props): Res => {
  const {
    mutate: deleteFile,
    isPending,
    isSuccess,
    isError,
  } = useDeleteFileMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      void instance.queryClient.invalidateQueries({
        queryKey: [queryKey.getFilesStats],
      })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      toast.error('Problem during deletion')
    }
  }, [isError])

  const onDeleteClick = useCallback((e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    const shouldDeleteFile = confirm('Delete file?')

    if (!shouldDeleteFile) {
      return
    }

    deleteFile({ fileName })
  }, [])

  return {
    onDeleteClick,
    isPending,
    isSuccess,
  }
}
