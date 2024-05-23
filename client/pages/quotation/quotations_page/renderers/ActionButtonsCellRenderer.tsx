import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import { type ReactNode } from 'react'
import { OpenExistingQuotationPageButton } from '@features/open_close/open_existing_quotation_page'
import { OpenEditQuotationModalButton } from '@features/open_close/open_quotation_edit_modal'
import { DeleteQuotationButton } from '@features/quotation/delete_quotation'
import { type Quotation } from '@entities/quotation'

export const ActionButtonsCellRenderer = (
  params: ICellRendererParams<Partial<Quotation>>,
): ReactNode => {
  if (params.data?.id === undefined) return null

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <OpenExistingQuotationPageButton id={params.data.id} />
      <OpenEditQuotationModalButton id={params.data.id} />
      <DeleteQuotationButton id={params.data.id} />
    </Box>
  )
}
