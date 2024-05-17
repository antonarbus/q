import { IconButton } from '@mui/material'
import type { ReqBody } from '@server/api/deleteItemRouter'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { useDeleteBookmarkMutation, deleteFromBookmarksCache } from '@entities/bookmark'
import { RotatingLoaderIcon } from '@shared/components'
import { notify } from '@shared/ui/top_msg'

export const DeleteItemButton = ({ id }: ReqBody): JSX.Element => {
  const { mutate: deleteItem, isPending, isSuccess, isError, error } = useDeleteBookmarkMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      deleteFromBookmarksCache({ id })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'light' })
      deleteFromBookmarksCache({ id })
    }
  }, [isError])

  return (
    <IconButton
      size='small'
      onClick={() => {
        deleteItem({ id })
      }}
    >
      {!isPending && <MdDeleteOutline />}
      {isPending && <RotatingLoaderIcon />}
    </IconButton>
  )
}
