import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'
import type { ItemPick } from '@back/api/bookmark/getBookmarksRouter'

export const bookmarksAgGridRef: RefObject<AgGridReact<ItemPick> | null> = {
  current: null,
}
