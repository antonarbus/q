import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import { type ReactNode } from 'react'
import { OpenEditQuotationModalButton } from '@features/open_close/open_quotation_edit_modal'
import { OpenQuotationPageAndLoadFromServerButton } from '@features/open_close/open_quotation_page'
import { DeleteQuotationButton } from '@features/quotation/delete_quotation'
import { type Quotation } from '@entities/quotation'

export const ActionButtonsCellRenderer = (
  params: ICellRendererParams<Partial<Quotation>>,
): ReactNode => {
  if (params.data?.id === undefined) return null

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <OpenQuotationPageAndLoadFromServerButton id={params.data.id} />
      <OpenEditQuotationModalButton id={params.data.id} />
      <DeleteQuotationButton id={params.data.id} />
    </Box>
  )
}
