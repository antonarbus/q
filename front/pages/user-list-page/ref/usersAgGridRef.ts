import type { ResBody } from '@back/api/user/getUserListHandler'
import type { AgGridReact } from 'ag-grid-react'

export const usersAgGridRef: React.RefObject<AgGridReact<ResBody['userList'][number]> | null> = {
  current: null,
}
