import type { ResBody } from '@back/api/file/getFileListAllHandler'
import type { AgGridReact } from 'ag-grid-react'

export const fileListAllAgGridRef: React.RefObject<AgGridReact<
  ResBody['fileList'][number]
> | null> = {
  current: null,
}
