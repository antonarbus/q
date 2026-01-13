import type { UrlParam as Payload } from '@back/api/quotation/deleteQuotationHandler'
import { useDeleteQuotationMutation } from '@entity/quotation/api/useDeleteQuotationMutation'
import { deleteFromQuotationListCache } from '@entity/quotation/cache-updater/deleteFromQuotationListCache'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import type { ReactNode } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const DeleteQuotationButton = (props: Payload): ReactNode => {
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
        onClick={() => {
          const askForConfirmation = (): boolean => {
            const areYouSure = confirm('Are you sure?')

            return areYouSure
          }

          if (askForConfirmation() === false) {
            return
          }

          deleteQuotationMutation.mutate({ id: props.id })
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
