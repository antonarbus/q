import type { Quotation } from '@back/entity/quotation/schema'
import { CopyBookmarkButton } from '@feature/bookmark/copy-bookmark'
import { DeleteBookmarkButton } from '@feature/bookmark/delete-bookmark'
import { OpenBookmarkModalButton } from '@feature/open-close/open-bookmark-modal'
import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { ReactNode } from 'react'

type Params = ICellRendererParams<Partial<Quotation>>

export const ActionButtonsCellRenderer = (params: Params): ReactNode => {
  if (params.data?.id === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <CopyBookmarkButton bookmarkId={params.data.id} />
      <OpenBookmarkModalButton bookmarkId={params.data.id} />
      <DeleteBookmarkButton bookmarkId={params.data.id} />
    </Box>
  )
}
