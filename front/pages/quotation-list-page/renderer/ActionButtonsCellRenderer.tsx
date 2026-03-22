import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { OpenQuotationPageAndLoadFromServerButton } from '@front/features/open-close/open-quotation-page'
import { OpenSaveQuotationModalButton } from '@front/features/open-close/open-save-quotation-modal'
import { DeleteQuotationButton } from '@front/features/quotation/delete-quotation/DeleteQuotationButton'
import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'

type Params = ICellRendererParams<ResBody['quotationList'][number]>

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
