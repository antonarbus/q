import type { UserPicked } from '@back/api/user/getUserListHandler'
import { DeleteUserButton } from '@features/user/delete-user'
import { LogInAsUserButton } from '@features/user/log-in-as-user'
import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { ReactNode } from 'react'

type Params = ICellRendererParams<UserPicked>

export const ActionButtonsCellRenderer = (params: Params): ReactNode => {
  if (params.data?.email === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <LogInAsUserButton email={params.data.email} />
      <DeleteUserButton email={params.data.email} />
    </Box>
  )
}
