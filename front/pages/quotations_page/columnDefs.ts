import type { ColDef, ValueGetterParams } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderers/ActionButtonsCellRenderer'
import { SharedWithCellRenderer } from './renderers/SharedWithCellRenderer'
import { DateCellRenderer } from '@shared/lib/ag_grid/renderers/DateCellRenderer'
import { dateFilterComparator } from '@shared/lib/ag_grid/comparators/dateFilterComparator'
import { dateValueGetter } from '@shared/lib/ag_grid/value_getter/dateValueGetter'
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
    field: 'sharedWith',
    headerName: 'shared with',
    cellRenderer: SharedWithCellRenderer,
    valueGetter: (
      params: ValueGetterParams<QuotationPick, QuotationPick['sharedWith']>,
    ): string => {
      const sharedWith = params.data?.sharedWith ?? []

      if (sharedWith.length === 0) {
        return 'nobody'
      }

      if (sharedWith.at(0) === '*') {
        return 'everybody'
      }

      if (sharedWith.length > 1) {
        const emails = sharedWith.join(';')

        return emails
      }

      return ''
    },
  },
]
