import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import type { AgGridReact } from 'ag-grid-react'

export const bookmarkListAgGridRef: React.RefObject<AgGridReact<
  ResBody['bookmarkList'][number]
> | null> = {
  current: null,
}
