import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const bookmarkListAgGridRef: RefObject<AgGridReact<ItemPick> | null> = {
  current: null,
}
