import { type AgGridReact } from 'ag-grid-react'
import { type RefObject } from 'react'
import { type Copyable } from '@entities/item'

export const itemsAgGridRef: RefObject<AgGridReact<Copyable>> = {
  current: null,
}
