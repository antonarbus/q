import type { ResBody } from '@back/api/file/getFileListAllHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const fileListAllAgGridRef: RefObject<AgGridReact<
  ResBody['fileList'][number]
> | null> = {
  current: null,
}
