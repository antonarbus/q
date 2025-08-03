import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'
import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { getTextColDef } from '@shared/lib/ag-grid/colDef/getTextColDef'
import { getDateColDef } from '@shared/lib/ag-grid/colDef/getDateColDef'

export const defaultColDef: ColDef<ItemPick> = {
  headerClass: ['center'],
  width: 170,
  minWidth: 170,
  editable: false,
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  resizable: true,
  sortable: true,
  unSortIcon: true,
  suppressHeaderMenuButton: true,
  flex: 1,
}

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
