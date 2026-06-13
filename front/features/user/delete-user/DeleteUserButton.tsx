import type { UrlParam } from '@back/api/user/deleteUserHandler'
import { useDeleteUserMutation } from '@front/entities/user/api/useDeleteUserMutation'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { queryClient } from '@front/shared/lib/tanstack-query/queryClient'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'

export const DeleteUserButton = (props: UrlParam): React.ReactNode => {
  const deleteUserMutation = useDeleteUserMutation()

  useUpdateEffect(() => {
    if (deleteUserMutation.isSuccess === true) {
      void queryClient.invalidateQueries({
        queryKey: [queryKey.getUserList],
      })
    }
  }, [deleteUserMutation.isSuccess])

  useUpdateEffect(() => {
    if (deleteUserMutation.isError === true) {
      toast.error(deleteUserMutation.error.response?.data.message)

      void queryClient.invalidateQueries({
        queryKey: [queryKey.getUserList],
      })
    }
  }, [deleteUserMutation.isError])

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='bottom' title='Delete'>
      <IconButton
        onClick={() =>
          void (async (): Promise<void> => {
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
          })()
        }
        size='small'
      >
        {deleteUserMutation.isPending === true ? <RotatingLoaderIcon /> : <MdDeleteOutline />}
      </IconButton>
    </Tooltip>
  )
}
