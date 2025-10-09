import type { UserPicked } from '@back/api/user/getUserListHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const usersAgGridRef: RefObject<AgGridReact<UserPicked> | null> = {
  current: null,
}
