import type { ReqBody as Payload } from '@back/api/quotation/deleteQuotation'
import { IconButton, Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import {
  useDeleteQuotationMutation,
  deleteFromQuotationsCache,
} from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
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
    if (isSuccess) {
      deleteFromQuotationsCache({ id })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      toast.error(error.response?.data.message)

      deleteFromQuotationsCache({ id })
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

          if (!askForConfirmation()) {
            return
          }

          deleteQuotation({ id })
        }}
      >
        {!isPending && <MdDeleteOutline />}
        {isPending && <RotatingLoaderIcon />}
      </IconButton>
    </Tooltip>
  )
}
