import type { ColDef, ValueGetterParams } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'
import { SharedWithCellRenderer } from './renderer/SharedWithCellRenderer'
import { DateCellRenderer } from '@shared/lib/ag-grid/renderers/DateCellRenderer'
import { dateFilterComparator } from '@shared/lib/ag-grid/comparators/dateFilterComparator'
import { dateValueGetter } from '@shared/lib/ag-grid/value_getter/dateValueGetter'
import type { QuotationPick } from '@back/api/quotation/getQuotationListHandler'
import { IdCellRenderer } from './renderer/IdCellRenderer'
import { NameCellRenderer } from './renderer/NameCellRenderer'
import { CategoryCellRenderer } from './renderer/CategoryCellRenderer'
import { DescriptionCellRenderer } from './renderer/DescriptionCellRenderer'

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
    valueGetter: (
      params: ValueGetterParams<QuotationPick, QuotationPick['access']>,
    ): string => {
      const access = params.data?.access

      if (access?.level === 'everyone') {
        return 'everyone'
      }

      if (access?.level === 'nobody') {
        return 'nobody'
      }

      if (access?.level === 'custom') {
        const userListAsString = access.userList.join(', ')

        return userListAsString
      }

      return ''
    },
  },
]
