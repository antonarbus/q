import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { OpenQuotationPageAndLoadFromServerButton } from '@feature/open-close/open-quotation-page'
import { OpenSaveQuotationModalButton } from '@feature/open-close/open-save-quotation-modal'
import { DeleteQuotationButton } from '@feature/quotation/delete-quotation'
import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { ReactNode } from 'react'

type Params = ICellRendererParams<ResBody['quotationList'][number]>

export const ActionButtonsCellRenderer = (params: Params): ReactNode => {
  if (params.data?.id === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <OpenQuotationPageAndLoadFromServerButton id={params.data.id} />
      <OpenSaveQuotationModalButton bookmarkId={params.data.id} />
      <DeleteQuotationButton quotationId={params.data.id} />
    </Box>
  )
}
