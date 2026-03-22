import type { ResBody } from '@back/api/quotation/getQuotationListAllHandler'
import type { AgGridReact } from 'ag-grid-react'

export const quotationListAllAgGridRef: React.RefObject<AgGridReact<
  ResBody['quotationList'][number]
> | null> = {
  current: null,
}
