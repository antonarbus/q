import type { ColDef } from 'ag-grid-community'
import { type Copyable } from '@entities/item'
import { ActionButtonsCellRenderer } from './ActionButtonsCellRenderer'
import { DateCellRenderer } from './DateCellRenderer'
import { dateFilterComparator } from './dateFilterComparator'
import { dateValueGetter } from './dateValueGetter'

export const defaultColDef: ColDef<Copyable> = {
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

export const columnDefs: Array<ColDef<Copyable>> = [
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
  {
    field: 'id',
    headerName: 'id',
    // hide: true,
  },
  {
    field: 'name',
    headerName: 'name',
  },
  {
    field: 'category',
    headerName: 'category',
  },
  {
    field: 'desc',
    headerName: 'description',
  },

  {
    field: 'type',
    headerName: 'type',
  },
  {
    field: 'createdAt',
    headerName: 'created',
    filter: 'agDateColumnFilter',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'createdAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
  {
    field: 'updatedAt',
    headerName: 'updated',
    filter: 'agDateColumnFilter',
    sort: 'desc',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'updatedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
]
