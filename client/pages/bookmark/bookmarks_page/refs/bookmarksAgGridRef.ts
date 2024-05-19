import { type AgGridReact } from 'ag-grid-react'
import { type RefObject } from 'react'
import { type Item } from '@entities/bookmark'

export const bookmarksAgGridRef: RefObject<AgGridReact<Item>> = {
  current: null,
}
