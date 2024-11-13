import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import { OpenQuotationPageAndLoadFromServerButton } from '@features/open_close/open_quotation_page'
import { DeleteQuotationButton } from '@features/quotation/delete_quotation'
import { OpenQuotationModalButton } from '@features/open_close/open_quotation_modal'
import type { QuotationPick } from '@back/api/quotation/getQuotationsRouter'

type Params = ICellRendererParams<QuotationPick>

export const ActionButtonsCellRenderer = (params: Params): React.ReactNode => {
  if (params.data?.id === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <OpenQuotationPageAndLoadFromServerButton id={params.data.id} />
      <OpenQuotationModalButton id={params.data.id} />
      <DeleteQuotationButton id={params.data.id} />
    </Box>
  )
}
