import type { ReqBody as Payload } from '@back/api/quotation/deleteQuotationRouter'
import { IconButton, Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import {
  useDeleteQuotationMutation,
  deleteFromQuotationsCache,
} from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { notify } from '@shared/toast'

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
      notify({
        msg: error.response?.data.message,
        type: 'error',
        theme: 'light',
      })

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
          deleteQuotation({ id })
        }}
      >
        {!isPending && <MdDeleteOutline />}
        {isPending && <RotatingLoaderIcon />}
      </IconButton>
    </Tooltip>
  )
}
