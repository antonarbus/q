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
  const {
    mutate: deleteItem,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeleteBookmarkMutation()

  useUpdateEffect(() => {
    if (isSuccess === true) {
      deleteFromBookmarkListCache({ id })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      toast.error(error.response?.data.message)

      deleteFromBookmarkListCache({ id })
    }
  }, [isError])

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

          deleteItem({ id })
        }}
        size='small'
      >
        {isPending === true ? <RotatingLoaderIcon /> : <MdDeleteOutline />}
      </IconButton>
    </Tooltip>
  )
}
