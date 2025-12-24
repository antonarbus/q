import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const quotationListAgGridRef: RefObject<AgGridReact<
  ResBody['quotationList'][number]
> | null> = {
  current: null,
}
