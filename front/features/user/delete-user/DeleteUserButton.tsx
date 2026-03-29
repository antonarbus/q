import type { UrlParam } from '@back/api/user/deleteUserHandler'
import { useDeleteUserMutation } from '@front/entities/user/api/useDeleteUserMutation'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { confirmWithDialog } from '@front/shared/component/ConfirmationDialog'
import { instance } from '@front/shared/instance'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const DeleteUserButton = (props: UrlParam): React.ReactNode => {
  const deleteUserMutation = useDeleteUserMutation()

  useUpdateEffect(() => {
    if (deleteUserMutation.isSuccess === true) {
      instance.queryClient.invalidateQueries({
        queryKey: [queryKey.getUserList],
      })
    }
  }, [deleteUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (deleteUserMutation.isError === true) {
      toast.error(deleteUserMutation.error.response?.data.message)

      instance.queryClient.invalidateQueries({
        queryKey: [queryKey.getUserList],
      })
    }
  }, [deleteUserMutation.isError])

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='bottom' title='Delete'>
      <IconButton
        onClick={async () => {
          const confirmed = await confirmWithDialog({
            description: 'Are you sure?',
          })

          if (confirmed === false) {
            return
          }

          const answer = await confirmWithDialog({
            description: 'What is 2 + 3?',
            inputLabel: 'Answer',
            confirmButtonText: 'Check',
          })

          if (answer !== '5') {
            return
          }

          const finalConfirmed = await confirmWithDialog({
            description: 'This action is irrecoverable, are you really sure?',
            confirmButtonText: 'Yes, delete',
          })

          if (finalConfirmed === false) {
            return
          }

          deleteUserMutation.mutate({ id: props.id })
        }}
        size='small'
      >
        {deleteUserMutation.isPending === true ? <RotatingLoaderIcon /> : <MdDeleteOutline />}
      </IconButton>
    </Tooltip>
  )
}
