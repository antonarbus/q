import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const bookmarkListAgGridRef: RefObject<AgGridReact<
  ResBody['bookmarkList'][number]
> | null> = {
  current: null,
}
