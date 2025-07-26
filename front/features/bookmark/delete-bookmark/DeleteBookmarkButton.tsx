import type { ReqBody } from '@back/api/bookmark/deleteBookmarkHandler'
import { IconButton, Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import {
  useDeleteBookmarkMutation,
  deleteFromBookmarkListCache,
} from '@entities/bookmark'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { toast } from 'sonner'

export const DeleteBookmarkButton = ({ id }: ReqBody): React.JSX.Element => {
  const deleteBookmarkMutation = useDeleteBookmarkMutation()

  useUpdateEffect(() => {
    if (deleteBookmarkMutation.isSuccess === true) {
      deleteFromBookmarkListCache({ id })
    }
  }, [deleteBookmarkMutation.isSuccess])

  useUpdateEffect(() => {
    if (deleteBookmarkMutation.isError === true) {
      toast.error(deleteBookmarkMutation.error.response?.data.message)
      deleteFromBookmarkListCache({ id })
    }
  }, [deleteBookmarkMutation.isError])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Delete'
    >
      <IconButton
        onClick={() => {
          const askForConfirmation = (): boolean => {
            const areYouSure = confirm('Are you sure?')

            return areYouSure
          }

          if (askForConfirmation() === false) {
            return
          }

          deleteBookmarkMutation.mutate({ id })
        }}
        size='small'
      >
        {deleteBookmarkMutation.isPending === true ? (
          <RotatingLoaderIcon />
        ) : (
          <MdDeleteOutline />
        )}
      </IconButton>
    </Tooltip>
  )
}
