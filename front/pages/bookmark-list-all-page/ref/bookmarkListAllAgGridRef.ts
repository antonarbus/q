import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'
import type { ItemPick } from '@back/api/bookmark/getBookmarkListAllHandler'

export const bookmarkListAllAgGridRef: RefObject<AgGridReact<ItemPick> | null> =
  {
    current: null,
  }
