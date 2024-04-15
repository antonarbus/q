import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './ActionButtonsCellRenderer'
import { DateCellRenderer } from './DateCellRenderer'
import { dateFilterComparator } from './dateFilterComparator'
import { dateValueGetter } from './dateValueGetter'

export const defaultColDef: ColDef<QuotationModelType> = {
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

export const columnDefs: Array<ColDef<QuotationModelType>> = [
  {
    cellRenderer: ActionButtonsCellRenderer,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
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
    field: 'createdAt',
    headerName: 'created',
    filter: 'agDateColumnFilter',
    valueGetter: dateValueGetter({ columnDef: 'createdAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
    minWidth: 200,
  },
  {
    field: 'updatedAt',
    headerName: 'updated',
    filter: 'agDateColumnFilter',
    valueGetter: dateValueGetter({ columnDef: 'updatedAt' }),
    cellRenderer: DateCellRenderer,
    filterParams: {
      comparator: dateFilterComparator,
    },
    minWidth: 200,
  },
]
