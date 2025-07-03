import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'
import { DateCellRenderer } from '@shared/lib/ag-grid/renderers/DateCellRenderer'
import { dateFilterComparator } from '@shared/lib/ag-grid/comparators/dateFilterComparator'
import { dateValueGetter } from '@shared/lib/ag-grid/value_getter/dateValueGetter'
import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { IdCellRenderer } from './renderer/IdCellRenderer'
import { NameCellRenderer } from './renderer/NameCellRenderer'
import { CategoryCellRenderer } from './renderer/CategoryCellRenderer'
import { DescriptionCellRenderer } from './renderer/DescriptionCellRenderer'
import { TypeCellRenderer } from './renderer/TypeCellRenderer'

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
    field: 'category',
    headerName: 'category',
    cellRenderer: CategoryCellRenderer,
  },
  {
    field: 'desc',
    headerName: 'description',
    cellRenderer: DescriptionCellRenderer,
  },

  {
    field: 'type',
    headerName: 'type',
    cellRenderer: TypeCellRenderer,
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
