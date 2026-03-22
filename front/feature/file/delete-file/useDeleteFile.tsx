import { useDeleteFileMutation } from '@entity/file/api/useDeleteFileMutation'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/lib/tanstack-query/queryKey'
import { useCallback } from 'react'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  fileId: string
}

type Res = {
  handleClick: (e: React.MouseEvent) => void
  isSuccess: boolean
  isPending: boolean
}

export const useDeleteFile = (props: Props): Res => {
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

  const handleClick = useCallback((event: React.MouseEvent): void => {
    event.preventDefault()
    event.stopPropagation()

    const shouldDeleteFile = confirm('Delete file?')

    if (shouldDeleteFile === false) {
      return
    }

    deleteFileMutation.mutate({ id: props.fileId })
  }, [])

  return {
    handleClick,
    isPending: deleteFileMutation.isPending,
    isSuccess: deleteFileMutation.isSuccess,
  }
}
