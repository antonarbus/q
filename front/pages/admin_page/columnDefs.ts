import type { ColDef } from 'ag-grid-community'
import { DateCellRenderer } from '@shared/lib/ag_grid/renderers/DateCellRenderer'
import { dateFilterComparator } from '@shared/lib/ag_grid/comparators/dateFilterComparator'
import { dateValueGetter } from '@shared/lib/ag_grid/value_getter/dateValueGetter'
import type { User } from '@entities/user'

export const defaultColDef: ColDef<User> = {
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

export const columnDefs: ColDef<User>[] = [
  {
    field: 'email',
    headerName: 'email',
  },
  {
    field: 'loggedAt',
    headerName: 'loggedAt',
    filter: 'agDateColumnFilter',
    sort: 'desc',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'updatedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
  {
    field: 'updatedAt',
    headerName: 'updatedAt',
    filter: 'agDateColumnFilter',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'updatedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
  {
    field: 'createdAt',
    headerName: 'createdAt',
    filter: 'agDateColumnFilter',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'updatedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
  {
    field: 'isActivated',
    headerName: 'isActivated',
  },
]
