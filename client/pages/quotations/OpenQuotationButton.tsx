import { Button } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ICellRendererParams } from 'ag-grid-community'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const OpenQuotationButton = (params: ICellRendererParams<QuotationModelType>): ReactNode => {
  if (params.data === undefined) return null

  return (
    <Link
      to={`/${params.data.id}`}
    >
      <Button
        variant='outlined'
        size='small'
        sx={{
          fontWeight: 400,
          lineHeight: 1.4,
          minWidth: 'unset',
        }}
      >
        Open
      </Button>
    </Link>
  )
}
