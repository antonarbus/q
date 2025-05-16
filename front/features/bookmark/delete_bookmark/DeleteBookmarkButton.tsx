import type { ReqBody } from '@back/api/bookmark/deleteBookmarkHandler'
import { IconButton, Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import {
  useDeleteBookmarkMutation,
  deleteFromBookmarksCache,
} from '@entities/bookmark'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { toast } from 'sonner'

export const DeleteBookmarkButton = ({ id }: ReqBody): React.JSX.Element => {
  const {
    mutate: deleteItem,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeleteBookmarkMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      deleteFromBookmarksCache({ id })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      toast.error(error.response?.data.message)

      deleteFromBookmarksCache({ id })
    }
  }, [isError])

  return (
    <Tooltip
      title='Delete'
      placement='bottom'
      enterDelay={500}
      enterNextDelay={500}
    >
      <IconButton
        size='small'
        onClick={() => {
          const askForConfirmation = (): boolean => {
            const areYouSure = confirm('Are you sure?')

            return areYouSure
          }

          if (askForConfirmation() === false) {
            return
          }

          deleteItem({ id })
        }}
      >
        {isPending === false && <MdDeleteOutline />}
        {isPending && <RotatingLoaderIcon />}
      </IconButton>
    </Tooltip>
  )
}
