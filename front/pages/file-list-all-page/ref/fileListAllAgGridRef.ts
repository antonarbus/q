import type { Item } from '@back/api/file/getFileListAllHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const fileListAllAgGridRef: RefObject<AgGridReact<Item> | null> = {
  current: null,
}
