import type { QuotationPick } from '@back/api/quotation/getQuotationListHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const quotationListAgGridRef: RefObject<AgGridReact<QuotationPick> | null> =
  {
    current: null,
  }
