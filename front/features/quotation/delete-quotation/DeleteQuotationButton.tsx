import type { ReqBody as Payload } from '@back/api/quotation/deleteQuotationHandler'
import { IconButton, Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import {
  useDeleteQuotationMutation,
  deleteFromQuotationListCache,
} from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { toast } from 'sonner'

export const DeleteQuotationButton = ({ id }: Payload): React.ReactNode => {
  const deleteQuotationMutation = useDeleteQuotationMutation()

  useUpdateEffect(() => {
    if (deleteQuotationMutation.isSuccess === true) {
      deleteFromQuotationListCache({ id })
    }
  }, [deleteQuotationMutation.isSuccess])

  useUpdateEffect(() => {
    if (deleteQuotationMutation.isError === true) {
      toast.error(deleteQuotationMutation.error.response?.data.message)
      deleteFromQuotationListCache({ id })
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

          deleteQuotationMutation.mutate({ id })
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
