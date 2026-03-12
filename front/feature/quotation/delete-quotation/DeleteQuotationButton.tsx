import type { UrlParam as Payload } from '@back/api/quotation/deleteQuotationHandler'
import { useDeleteQuotationMutation } from '@entity/quotation/api/useDeleteQuotationMutation'
import { deleteFromQuotationListCache } from '@entity/quotation/cache-updater/deleteFromQuotationListCache'
import { IconButton, Tooltip } from '@mui/material'
import { confirmWithDialog } from '@shared/component/ConfirmationDialog'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const DeleteQuotationButton = (props: Payload): React.ReactNode => {
  const deleteQuotationMutation = useDeleteQuotationMutation()

  useUpdateEffect(() => {
    if (deleteQuotationMutation.isSuccess === true) {
      deleteFromQuotationListCache({ id: props.id })
    }
  }, [deleteQuotationMutation.isSuccess])

  useUpdateEffect(() => {
    if (deleteQuotationMutation.isError === true) {
      if (
        deleteQuotationMutation.error.response?.data.errorCode ===
        'INTERNAL_ERROR'
      ) {
        toast.error('Failed to delete')
      }

      deleteFromQuotationListCache({ id: props.id })
    }
  }, [deleteQuotationMutation.isError])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Delete'
    >
      <IconButton
        onClick={async () => {
          const areYouSure = await confirmWithDialog()

          if (areYouSure === true) {
            deleteQuotationMutation.mutate({ id: props.id })
          }
        }}
        size='small'
      >
        {deleteQuotationMutation.isPending === true ? (
          <RotatingLoaderIcon />
        ) : (
          <MdDeleteOutline />
        )}
      </IconButton>
    </Tooltip>
  )
}
