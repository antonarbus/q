import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import type { AgGridReact } from 'ag-grid-react'

export const quotationListAgGridRef: React.RefObject<AgGridReact<
  ResBody['quotationList'][number]
> | null> = {
  current: null,
}
