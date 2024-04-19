import { type AgGridReact } from 'ag-grid-react'
import { type RefObject } from 'react'
import { type ItemCopyable } from '@entities/quotation'

export const itemsAgGridRef: RefObject<AgGridReact<ItemCopyable>> = {
  current: null,
}
