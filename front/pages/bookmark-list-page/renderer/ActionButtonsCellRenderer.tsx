import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import { CopyBookmarkButton } from '@features/bookmark/copy-bookmark'
import { DeleteBookmarkButton } from '@features/bookmark/delete-bookmark'
import { OpenBookmarkModalButton } from '@features/open-close/open-bookmark-modal'
import type { Quotation } from '@entities/quotation'
import type { ReactNode } from 'react'

type Params = ICellRendererParams<Partial<Quotation>>

export const ActionButtonsCellRenderer = (params: Params): ReactNode => {
  if (params.data?.id === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <CopyBookmarkButton id={params.data.id} />
      <OpenBookmarkModalButton id={params.data.id} />
      <DeleteBookmarkButton id={params.data.id} />
    </Box>
  )
}
