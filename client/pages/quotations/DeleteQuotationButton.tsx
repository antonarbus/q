import { Button } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ICellRendererParams } from 'ag-grid-community'
import { useEffect, type ReactNode } from 'react'
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
        // lineHeight: 1.4,
        width: '50px',
        height: '27px',
        p: '5px',
      }}
    >
      {!isPending && 'Delete'}
      {isPending && <RotatingLoaderIcon />}
    </Button>
  )
}
