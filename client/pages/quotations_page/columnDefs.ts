import type { ColDef } from 'ag-grid-community'
import { type Quotation } from '@entities/quotation'
import { dateFilterComparator } from './comparators/dateFilterComparator'
import { ActionButtonsCellRenderer } from './renderers/ActionButtonsCellRenderer'
import { DateCellRenderer } from './renderers/DateCellRenderer'
import { dateValueGetter } from './value_getters/dateValueGetter'

export const defaultColDef: ColDef<Quotation> = {
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

export const columnDefs: Array<ColDef<Quotation>> = [
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
    field: 'openedAt',
    headerName: 'opened',
    filter: 'agDateColumnFilter',
    sort: 'desc',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'openedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
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
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'updatedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
]
