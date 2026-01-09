import type { ReqBody } from '@back/api/bookmark/deleteBookmarkHandler'
import { useDeleteBookmarkMutation } from '@entity/bookmark/api/useDeleteBookmarkMutation'
import { deleteFromBookmarkListCache } from '@entity/bookmark/cache-updater/deleteFromBookmarkListCache'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import type { JSX } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const DeleteBookmarkButton = (props: ReqBody): JSX.Element => {
  const deleteBookmarkMutation = useDeleteBookmarkMutation()

  useUpdateEffect(() => {
    if (deleteBookmarkMutation.isSuccess === true) {
      deleteFromBookmarkListCache({ id: props.bookmarkId })
    }
  }, [deleteBookmarkMutation.isSuccess])

  useUpdateEffect(() => {
    if (deleteBookmarkMutation.isError === true) {
      toast.error(deleteBookmarkMutation.error.response?.data.message)
      deleteFromBookmarkListCache({ id: props.bookmarkId })
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

          deleteBookmarkMutation.mutate({ bookmarkId: props.bookmarkId })
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
