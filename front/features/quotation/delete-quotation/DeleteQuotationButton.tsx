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
  const {
    mutate: deleteQuotation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeleteQuotationMutation()

  useUpdateEffect(() => {
    if (isSuccess === true) {
      deleteFromQuotationListCache({ id })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      toast.error(error.response?.data.message)

      deleteFromQuotationListCache({ id })
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

          deleteQuotation({ id })
        }}
        size='small'
      >
        {isPending === true ? <RotatingLoaderIcon /> : <MdDeleteOutline />}
      </IconButton>
    </Tooltip>
  )
}
