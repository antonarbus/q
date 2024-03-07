import { type AgGridReact } from 'ag-grid-react'
import { type RefObject } from 'react'

export const quotationsAgGridRef: RefObject<AgGridReact<QuotationsTable>> = {
  current: null,
}
