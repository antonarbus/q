import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import { type ReactNode } from 'react'
import { type Quotation } from '@entities/quotation'
import { DeleteQuotationButton } from './DeleteQuotationButton'
import { EditQuotationButton } from './EditQuotationButton'
import { OpenQuotationButton } from './OpenQuotationButton'

export const ActionButtonsCellRenderer = (params: ICellRendererParams<Partial<Quotation>>): ReactNode => {
  if (params.data?.id === undefined) return null

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <OpenQuotationButton id={params.data.id} />
      <EditQuotationButton id={params.data.id} />
      <DeleteQuotationButton id={params.data.id} />
    </Box>
  )
}
