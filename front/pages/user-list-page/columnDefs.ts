import type { ColDef } from 'ag-grid-community'
import type { UserPicked } from '@back/api/user/getUserListHandler'
import { ActionButtonsCellRenderer } from './renderer/ActionButtonsCellRenderer'
import { getTextColDef } from '@shared/lib/ag-grid/colDef/getTextColDef'
import { getDateColDef } from '@shared/lib/ag-grid/colDef/getDateColDef'
import { getBooleanColDef } from '@shared/lib/ag-grid/colDef/getBooleanColDef'

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
  getTextColDef({
    field: 'email',
    headerName: 'email',
  }),
  getDateColDef({
    field: 'loggedAt',
    sort: 'desc',
    headerName: 'loggedAt',
  }),
  getDateColDef({
    field: 'registeredAt',
    headerName: 'registeredAt',
  }),
  getBooleanColDef({
    field: 'isActivated',
  }),
]
