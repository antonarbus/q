import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { ReactNode } from 'react'
import { CopyBookmarkButton } from '@features/bookmark/copy_bookmark'
import { DeleteBookmarkButton } from '@features/bookmark/delete_bookmark'
import { OpenEditBookmarkModalButton } from '@features/open_close/open_bookmark_edit_modal'
import type { Quotation } from '@entities/quotation'

export const ActionButtonsCellRenderer = (
  params: ICellRendererParams<Partial<Quotation>>,
): ReactNode => {
  if (params.data?.id === undefined) return null

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <CopyBookmarkButton id={params.data.id} />
      <OpenEditBookmarkModalButton id={params.data.id} />
      <DeleteBookmarkButton id={params.data.id} />
    </Box>
  )
}
