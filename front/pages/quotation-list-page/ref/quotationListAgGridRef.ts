import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'
import type { QuotationPick } from '@back/api/quotation/getQuotationsHandler'

export const quotationListAgGridRef: RefObject<AgGridReact<QuotationPick> | null> =
  {
    current: null,
  }
