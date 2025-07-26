import { instance } from '@shared/instance'
import { queryKey } from '@shared/const/queryKey'
import { useCallback } from 'react'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { useDeleteFileMutation } from '@entities/file'

type Props = {
  fileId: string
}

type Res = {
  onDeleteClick: (e: React.MouseEvent) => void
  isSuccess: boolean
  isPending: boolean
}

export const useFileDelete = ({ fileId }: Props): Res => {
  const deleteFileMutation = useDeleteFileMutation()

  useUpdateEffect(() => {
    if (deleteFileMutation.isSuccess === true) {
      void instance.queryClient.invalidateQueries({
        queryKey: [queryKey.getFileListStats],
      })
    }
  }, [deleteFileMutation.isSuccess])

  useUpdateEffect(() => {
    if (deleteFileMutation.isError === true) {
      toast.error('Problem during deletion')
    }
  }, [deleteFileMutation.isError])

  const onDeleteClick = useCallback((event: React.MouseEvent): void => {
    event.preventDefault()
    event.stopPropagation()

    const shouldDeleteFile = confirm('Delete file?')

    if (shouldDeleteFile === false) {
      return
    }

    deleteFileMutation.mutate({ fileId })
  }, [])

  return {
    onDeleteClick,
    isPending: deleteFileMutation.isPending,
    isSuccess: deleteFileMutation.isSuccess,
  }
}
