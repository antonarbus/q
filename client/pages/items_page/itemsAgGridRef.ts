import { type AgGridReact } from 'ag-grid-react'
import { type RefObject } from 'react'
import { type Item } from '@entities/item'

export const itemsAgGridRef: RefObject<AgGridReact<Item>> = {
  current: null,
}
