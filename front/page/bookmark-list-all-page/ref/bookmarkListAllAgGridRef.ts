import type { ResBody } from '@back/api/bookmark/getBookmarkListAllHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const bookmarkListAllAgGridRef: RefObject<AgGridReact<
  ResBody['bookmarkList'][number]
> | null> = {
  current: null,
}
