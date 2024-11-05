import type { ReqBody } from '@back/api/bookmark/deleteBookmarkRouter'
import { IconButton, Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import {
  useDeleteBookmarkMutation,
  deleteFromBookmarksCache,
} from '@entities/bookmark'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { notify } from '@shared/toast'

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
      notify({
        msg: error.response?.data.message,
        type: 'error',
        theme: 'light',
      })

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
          deleteItem({ id })
        }}
      >
        {!isPending && <MdDeleteOutline />}
        {isPending && <RotatingLoaderIcon />}
      </IconButton>
    </Tooltip>
  )
}
