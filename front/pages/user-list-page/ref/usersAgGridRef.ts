import type { ResBody } from '@back/api/user/getUserListHandler'
import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'

export const usersAgGridRef: RefObject<AgGridReact<
  ResBody['userList'][number]
> | null> = {
  current: null,
}
