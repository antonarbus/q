import type { UrlParam } from '@back/api/bookmark/deleteBookmarkHandler'
import { useDeleteBookmarkMutation } from '@front/entities/bookmark/api/useDeleteBookmarkMutation'
import { deleteFromBookmarkListCache } from '@front/entities/bookmark/cache-updater/deleteFromBookmarkListCache'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'

export const DeleteBookmarkButton = (props: UrlParam): React.JSX.Element => {
  const deleteBookmarkMutation = useDeleteBookmarkMutation()

  useUpdateEffect(() => {
    if (deleteBookmarkMutation.isSuccess === true) {
      deleteFromBookmarkListCache({ id: props.id })
    }
  }, [deleteBookmarkMutation.isSuccess])

  useUpdateEffect(() => {
    if (deleteBookmarkMutation.isError === true) {
      toast.error(deleteBookmarkMutation.error.response?.data.message)
      deleteFromBookmarkListCache({ id: props.id })
    }
  }, [deleteBookmarkMutation.isError])

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='bottom' title='Delete'>
      <IconButton
        onClick={async (): Promise<void> => {
          const areYouSure = await confirmWithDialog()

          if (areYouSure === true) {
            deleteBookmarkMutation.mutate({ id: props.id })
          }
        }}
        size='small'
      >
        {deleteBookmarkMutation.isPending === true ? <RotatingLoaderIcon /> : <MdDeleteOutline />}
      </IconButton>
    </Tooltip>
  )
}
