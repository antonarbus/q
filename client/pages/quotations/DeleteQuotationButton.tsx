import { Delete } from '@mui/icons-material/'
import { Button, IconButton } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ICellRendererParams } from 'ag-grid-community'
import { useEffect, type ReactNode } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { useDeleteQuotationMutation } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'

export const DeleteQuotationButton = (params: ICellRendererParams<Partial<QuotationModelType>>): ReactNode => {
  const { mutate, isPending, isSuccess, data } = useDeleteQuotationMutation()

  useEffect(() => {
    if (!isSuccess) return
    const id = params.data?.id
    if (id === undefined) return
    params.api.applyTransaction({ remove: [{ id }] })
  }, [isSuccess])

  return (
    <IconButton
      size='small'
      onClick={() => {
        const id = params.data?.id
        if (id === undefined) return
        mutate({ id })
      }}
    >
      {!isPending && <MdDeleteOutline />}
      {isPending && <RotatingLoaderIcon />}
    </IconButton>
  )
}
