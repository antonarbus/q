import type { AgGridReact } from 'ag-grid-react'
import type { RefObject } from 'react'
import type { User } from '@entities/user'

export const usersAgGridRef: RefObject<AgGridReact<User>> = {
  current: null,
}
