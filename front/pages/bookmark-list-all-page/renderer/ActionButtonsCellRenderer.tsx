import type { Quotation } from '@back/entity/quotation/schema'
import { CopyBookmarkButtonAtTable } from '@front/features/bookmark/copy-bookmark/CopyBookmarkButtonAtTable'
import { DeleteBookmarkButton } from '@front/features/bookmark/delete-bookmark/DeleteBookmarkButton'
import { OpenBookmarkModalButton } from '@front/features/open-close/open-bookmark-modal'
import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'

type Params = ICellRendererParams<Partial<Quotation>>

export const ActionButtonsCellRenderer = (params: Params): React.ReactNode => {
  if (params.data?.id === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <CopyBookmarkButtonAtTable id={params.data.id} />
      <OpenBookmarkModalButton id={params.data.id} />
      <DeleteBookmarkButton id={params.data.id} />
    </Box>
  )
}
