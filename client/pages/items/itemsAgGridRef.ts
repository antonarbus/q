import { type ItemModelType } from '@server/db/models/itemModel'
import { type AgGridReact } from 'ag-grid-react'
import { type RefObject } from 'react'

export const itemsAgGridRef: RefObject<AgGridReact<ItemModelType>> = {
  current: null,
}
