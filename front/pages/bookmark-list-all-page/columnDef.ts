import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'
import type { ItemPick } from '@back/api/bookmark/getBookmarkListAllHandler'
import { getTextColDef } from '@shared/lib/ag-grid/colDef/getTextColDef'
import { getDateColDef } from '@shared/lib/ag-grid/colDef/getDateColDef'

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
  }),
  getTextColDef({
    field: 'email',
  }),
  getTextColDef({
    field: 'name',
  }),
  getTextColDef({
    field: 'type',
  }),
  getDateColDef({
    field: 'createdAt',
    headerName: 'created',
  }),
  getDateColDef({
    field: 'updatedAt',
    headerName: 'updated',
    sort: 'desc',
  }),
]
