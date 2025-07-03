import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import { OpenQuotationPageAndLoadFromServerButton } from '@features/open-close/open-quotation-page'
import { DeleteQuotationButton } from '@features/quotation/delete-quotation'
import { OpenSaveQuotationModalButton } from '@features/open-close/open-save-quotation-modal'
import type { QuotationPick } from '@back/api/quotation/getQuotationListHandler'

type Params = ICellRendererParams<QuotationPick>

export const ActionButtonsCellRenderer = (params: Params): React.ReactNode => {
  if (params.data?.id === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <OpenQuotationPageAndLoadFromServerButton id={params.data.id} />
      <OpenSaveQuotationModalButton id={params.data.id} />
      <DeleteQuotationButton id={params.data.id} />
    </Box>
  )
}
