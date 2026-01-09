import type { ResBody } from '@back/api/quotation/getQuotationListAllHandler'
import { getDateColDef } from '@shared/lib/ag-grid/colDef/getDateColDef'
import { getTextColDef } from '@shared/lib/ag-grid/colDef/getTextColDef'
import type { ColDef } from 'ag-grid-community'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'

export const columnDefs: ColDef<ResBody['quotationList'][number]>[] = [
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
  }),
  getTextColDef({
    field: 'email',
  }),
  getTextColDef({
    field: 'name',
  }),
  getDateColDef({
    field: 'createdAt',
    headerName: 'created',
  }),
  getDateColDef({
    field: 'updatedAt',
    headerName: 'updated',
    sort: 'desc',
  }),
]
