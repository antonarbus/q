import { IconButton } from '@mui/material'
import { type ReqBody as Payload } from '@server/api/deleteQuotationRouter'
import { type ReactNode } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { useDeleteQuotationMutation, deleteFromQuotationsCache } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { notify } from '@shared/ui/top_msg'

export const DeleteQuotationButton = ({ id }: Payload): ReactNode => {
  const { mutate: deleteQuotation, isPending, isSuccess, isError, error } = useDeleteQuotationMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      deleteFromQuotationsCache({ id })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'did not find') {
        notify({ msg: 'Not found', type: 'warn', theme: 'light' })
      } else if (error.response?.data.message === 'not deleted') {
        notify({ msg: 'Not deleted', type: 'warn', theme: 'light' })
      } else if (error.response?.data.message === 'not logged in') {
        notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      } else {
        notify({ msg: 'Internal error', type: 'error', theme: 'light' })
      }

      deleteFromQuotationsCache({ id })
    }
  }, [isError])

  return (
    <IconButton
      size='small'
      onClick={() => {
        deleteQuotation({ id })
      }}
    >
      {!isPending && <MdDeleteOutline />}
      {isPending && <RotatingLoaderIcon />}
    </IconButton>
  )
}
