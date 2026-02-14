import type { Quotation } from '@back/entity/quotation/schema'
import { CopyBookmarkButton } from '@feature/bookmark/copy-bookmark'
import { DeleteBookmarkButton } from '@feature/bookmark/delete-bookmark'
import { OpenBookmarkModalButton } from '@feature/open-close/open-bookmark-modal'
import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'

type Params = ICellRendererParams<Partial<Quotation>>

export const ActionButtonsCellRenderer = (params: Params): React.ReactNode => {
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
