import type { ColDef, ValueGetterParams } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'
import { SharedWithCellRenderer } from './renderer/SharedWithCellRenderer'
import type { QuotationPick } from '@back/api/quotation/getQuotationListHandler'
import { getTextColDef } from '@shared/lib/ag-grid/colDef/getTextColDef'
import { getDateColDef } from '@shared/lib/ag-grid/colDef/getDateColDef'

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
  getTextColDef({
    field: 'id',
    headerName: 'id',
  }),
  getTextColDef({
    field: 'name',
    headerName: 'name',
  }),
  getTextColDef({
    field: 'category',
    headerName: 'category',
  }),
  getTextColDef({
    field: 'desc',
    headerName: 'description',
  }),
  getDateColDef({
    field: 'openedAt',
    headerName: 'opened',
    sort: 'desc',
  }),
  getDateColDef({
    field: 'createdAt',
    headerName: 'created',
  }),
  getDateColDef({
    field: 'updatedAt',
    headerName: 'updated',
  }),
  getDateColDef({
    field: 'viewedAt',
    headerName: 'viewed',
  }),
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
