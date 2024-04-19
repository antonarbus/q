import { type AgGridReact } from 'ag-grid-react'
import { type RefObject } from 'react'
import { type Quotation } from '@entities/quotation'

export const quotationsAgGridRef: RefObject<AgGridReact<Quotation>> = {
  current: null,
}
