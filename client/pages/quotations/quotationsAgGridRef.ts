import { type QuotationModelType } from '@server/db/models/quotationModel'
import { type AgGridReact } from 'ag-grid-react'
import { type RefObject } from 'react'

export const quotationsAgGridRef: RefObject<AgGridReact<QuotationModelType>> = {
  current: null,
}
