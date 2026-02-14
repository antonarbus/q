import type { ResBody } from '@back/api/bookmark/getBookmarkListAllHandler'
import type { AgGridReact } from 'ag-grid-react'

export const bookmarkListAllAgGridRef: React.RefObject<AgGridReact<
  ResBody['bookmarkList'][number]
> | null> = {
  current: null,
}
