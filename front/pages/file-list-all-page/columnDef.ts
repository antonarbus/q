import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'
import type { Item } from '@back/api/file/getFileListAllHandler'
import { getTextColDef } from '@shared/lib/ag-grid/colDef/getTextColDef'
import { getDateColDef } from '@shared/lib/ag-grid/colDef/getDateColDef'

export const columnDefs: ColDef<Item>[] = [
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
  {
    field: 'usedByIdList',
    headerName: 'usedByIdList',
  },
  getDateColDef({
    field: 'uploadedAt',
    headerName: 'uploadedAt',
  }),
]
