import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import { type ReactNode } from 'react'
import { OpenEditBookmarkModalButton } from '@features/open_close/open_bookmark_edit_modal'
import { type Quotation } from '@entities/quotation'
import { DeleteBookmarkButton } from '../buttons/DeleteBookmarkButton'
import { GetBookmarkButton } from '../buttons/GetBookmarkButton'

export const ActionButtonsCellRenderer = (params: ICellRendererParams<Partial<Quotation>>): ReactNode => {
  if (params.data?.id === undefined) return null

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <GetBookmarkButton id={params.data.id} />
      <OpenEditBookmarkModalButton id={params.data.id} />
      <DeleteBookmarkButton id={params.data.id} />
    </Box>
  )
}
