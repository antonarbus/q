import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'
import { SharedWithCellRenderer } from './renderer/SharedWithCellRenderer'
import { DateCellRenderer } from '@shared/lib/ag-grid/renderers/DateCellRenderer'
import { dateFilterComparator } from '@shared/lib/ag-grid/comparators/dateFilterComparator'
import { dateValueGetter } from '@shared/lib/ag-grid/value_getter/dateValueGetter'
import type { QuotationPick } from '@back/api/quotation/getQuotationsHandler'

export const defaultColDef: ColDef<QuotationPick> = {
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

export const columnDefs: ColDef<QuotationPick>[] = [
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
  {
    field: 'viewedAt',
    headerName: 'viewed',
    filter: 'agDateColumnFilter',
    minWidth: 200,
    valueGetter: dateValueGetter({ columnDef: 'viewedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
  },
  {
    field: 'access',
    headerName: 'shared with',
    cellRenderer: SharedWithCellRenderer,
    valueFormatter: () => '', // to suppress the warning "Cell data type is "object" but no Value Formatter has been provided"
  },
]
