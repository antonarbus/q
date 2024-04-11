import { Box } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ICellRendererParams } from 'ag-grid-community'
import { type ReactNode } from 'react'
import { DeleteItemButton } from './DeleteItemButton'
import { OpenItemButton } from './OpenItemButton'

export const ActionButtonsCellRenderer = (params: ICellRendererParams<Partial<QuotationModelType>>): ReactNode => {
  if (params.data?.id === undefined) return null

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <OpenItemButton id={params.data.id} />
      <DeleteItemButton id={params.data.id} />
    </Box>
  )
}
