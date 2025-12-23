import type { ResBody } from '@back/api/file/getFileListAllHandler'
import { getDateColDef } from '@shared/lib/ag-grid/colDef/getDateColDef'
import { getTextColDef } from '@shared/lib/ag-grid/colDef/getTextColDef'
import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'

export const columnDefs: ColDef<ResBody['fileList'][number]>[] = [
  {
    cellRenderer: ActionButtonsCellRenderer,
    width: 150,
    minWidth: 150,
    maxWidth: 150,
    sortable: false,
    filter: false,
    resizable: false,
    suppressMovable: true,
    lockPosition: 'left',
    pinned: 'left',
    suppressColumnsToolPanel: true,
    suppressNavigable: true,
  },
  getTextColDef({
    field: 'id',
  }),
  getTextColDef({
    field: 'name',
  }),
  {
    field: 'size',
  },
  getTextColDef({
    field: 'email',
  }),
  getDateColDef({
    field: 'uploadedAt',
    headerName: 'uploadedAt',
  }),
]
