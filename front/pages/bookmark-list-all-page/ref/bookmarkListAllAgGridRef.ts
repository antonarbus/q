import type { ItemPick } from '@back/api/bookmark/getBookmarkListAllHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const bookmarkListAllAgGridRef: RefObject<AgGridReact<ItemPick> | null> =
  {
    current: null,
  }
