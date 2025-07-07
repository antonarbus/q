import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'
import { DateCellRenderer } from '@shared/lib/ag-grid/renderers/DateCellRenderer'
import { dateFilterComparator } from '@shared/lib/ag-grid/comparators/dateFilterComparator'
import { dateValueGetter } from '@shared/lib/ag-grid/value_getter/dateValueGetter'
import type { Item } from '@back/api/file/getFileListAllHandler'
import { IdCellRenderer } from './renderer/IdCellRenderer'
import { NameCellRenderer } from './renderer/NameCellRenderer'
import { EmailCellRenderer } from './renderer/EmailCellRenderer'

export const defaultColDef: ColDef<Item> = {
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
  {
    field: 'id',
    headerName: 'id',
    cellRenderer: IdCellRenderer,
  },
  {
    field: 'name',
    headerName: 'name',
    cellRenderer: NameCellRenderer,
  },
  {
    field: 'size',
    headerName: 'size',
  },
  {
    field: 'email',
    headerName: 'email',
    cellRenderer: EmailCellRenderer,
  },
  {
    field: 'usedByIdList',
    headerName: 'usedByIdList',
  },
  {
    field: 'uploadedAt',
    headerName: 'uploadedAt',
    filter: 'agDateColumnFilter',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'uploadedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
]
