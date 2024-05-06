import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import { type ReactNode } from 'react'
import { type Quotation } from '@entities/quotation'
import { CopyItemButton } from './CopyItemButton'
import { DeleteItemButton } from './DeleteItemButton'

export const ActionButtonsCellRenderer = (params: ICellRendererParams<Partial<Quotation>>): ReactNode => {
  if (params.data?.id === undefined) return null

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <CopyItemButton id={params.data.id} />
      <DeleteItemButton id={params.data.id} />
    </Box>
  )
}
