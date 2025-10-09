import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { getDateColDef } from '@shared/lib/ag-grid/colDef/getDateColDef'
import { getTextColDef } from '@shared/lib/ag-grid/colDef/getTextColDef'
import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'

export const columnDefs: ColDef<ItemPick>[] = [
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
    headerName: 'id',
  }),
  getTextColDef({
    field: 'name',
    headerName: 'name',
  }),
  getTextColDef({
    field: 'category',
    headerName: 'category',
  }),
  getTextColDef({
    field: 'desc',
    headerName: 'description',
  }),
  getTextColDef({
    field: 'type',
    headerName: 'type',
  }),
  getDateColDef({
    field: 'createdAt',
    headerName: 'created',
  }),
  getDateColDef({
    field: 'updatedAt',
    headerName: 'created',
  }),
]
