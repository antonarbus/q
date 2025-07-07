import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'
import type { Item } from '@back/api/file/getFileListAllHandler'

export const fileListAllAgGridRef: RefObject<AgGridReact<Item> | null> = {
  current: null,
}
