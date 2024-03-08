import { Button } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ICellRendererParams } from 'ag-grid-community'
import type { ReactNode } from 'react'
import { useDeleteQuotation } from '@entities/quotation/api/useDeleteQuotation'

export const DeleteQuotationButton = (params: ICellRendererParams<QuotationModelType>): ReactNode => {
  const { mutate, isPending, isSuccess, data } = useDeleteQuotation()

  return (
    <Button
      onClick={() => {
        const id = params.data?.id
        if (id === undefined) return
        mutate({ id })
      }}
      variant='outlined'
      size='small'
      sx={{
        fontWeight: 400,
        lineHeight: 1.4,
        minWidth: 'unset',
      }}
    >
      Delete
    </Button>
  )
}
