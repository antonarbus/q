import { useDeleteFileMutation } from '@front/entities/file/api/useDeleteFileMutation'
import { confirmWithDialog } from '@front/shared/component/ConfirmationDialog'
import { instance } from '@front/shared/instance'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { useCallback } from 'react'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  fileId: string
}

type Res = {
  handleClick: (event: React.MouseEvent) => void
  isSuccess: boolean
  isPending: boolean
}

export const useDeleteFile = (props: Props): Res => {
  const deleteFileMutation = useDeleteFileMutation()

  useUpdateEffect(() => {
    if (deleteFileMutation.isSuccess === true) {
      instance.queryClient.invalidateQueries({
        queryKey: [queryKey.getFileListStats],
      })
    }
  }, [deleteFileMutation.isSuccess])

  useUpdateEffect(() => {
    if (deleteFileMutation.isError === true) {
      toast.error('Problem during deletion')
    }
  }, [deleteFileMutation.isError])

  const handleClick = useCallback(async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault()
    event.stopPropagation()

    const shouldDeleteFile = await confirmWithDialog({
      title: 'Confirm',
      description: 'Delete file?',
    })

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
