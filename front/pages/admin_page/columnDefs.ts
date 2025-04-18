import type { ColDef } from 'ag-grid-community'
import { DateCellRenderer } from '@shared/lib/ag_grid/renderers/DateCellRenderer'
import { dateFilterComparator } from '@shared/lib/ag_grid/comparators/dateFilterComparator'
import { dateValueGetter } from '@shared/lib/ag_grid/value_getter/dateValueGetter'
import type { UserPicked } from '@back/api/user/getUsersHandler'
import { ActionButtonsCellRenderer } from './renderers/ActionButtonsCellRenderer'

export const defaultColDef: ColDef<UserPicked> = {
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

export const columnDefs: ColDef<UserPicked>[] = [
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
    field: 'email',
    headerName: 'email',
  },
  {
    field: 'loggedAt',
    headerName: 'loggedAt',
    filter: 'agDateColumnFilter',
    sort: 'desc',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'loggedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
  {
    field: 'registeredAt',
    headerName: 'registeredAt',
    filter: 'agDateColumnFilter',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'registeredAt' }),
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
