import type { ResBody } from '@back/api/user/getUserListHandler'
import { DeleteUserButton } from '@feature/user/delete-user'
import { LogInAsUserButton } from '@feature/user/log-in-as-user'
import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'

type Params = ICellRendererParams<ResBody['userList'][number]>

export const ActionButtonsCellRenderer = (params: Params): React.ReactNode => {
  if (params.data?.email === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <LogInAsUserButton id={params.data.email} />
      <DeleteUserButton id={params.data.email} />
    </Box>
  )
}
