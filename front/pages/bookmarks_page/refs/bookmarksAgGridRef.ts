import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'
import type { ItemPick } from '@back/api/bookmark/getBookmarks'

export const bookmarksAgGridRef: RefObject<AgGridReact<ItemPick> | null> = {
  current: null,
}
