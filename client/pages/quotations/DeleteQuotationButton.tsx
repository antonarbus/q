import { IconButton } from '@mui/material'
import { useEffect, type ReactNode } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { useDeleteQuotationMutation, deleteFromQuotationsCache } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'

type Props = {
  id: string
}

export const DeleteQuotationButton = ({ id }: Props): ReactNode => {
  const { mutate, isPending, isSuccess } = useDeleteQuotationMutation()

  useEffect(() => {
    if (isSuccess) {
      deleteFromQuotationsCache({ id })
    }
  }, [isSuccess])

  return (
    <IconButton
      size='small'
      onClick={() => {
        mutate({ id })
      }}
    >
      {!isPending && <MdDeleteOutline />}
      {isPending && <RotatingLoaderIcon />}
    </IconButton>
  )
}
