import type { ResBody } from '@back/api/quotation/getQuotationListAllHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const quotationListAllAgGridRef: RefObject<AgGridReact<
  ResBody['quotationList'][number]
> | null> = {
  current: null,
}
