import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { UserPicked } from '@back/api/user/getUsersRouter'
import { DeleteUserButton } from '@features/user/delete_user'

type Params = ICellRendererParams<UserPicked>

export const ActionButtonsCellRenderer = (params: Params): React.ReactNode => {
  if (params.data?.email === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <DeleteUserButton email={params.data.email} />
    </Box>
  )
}
