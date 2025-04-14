import { Box } from '@mui/material'
import { useSelector } from '@shared/lib/redux'

export const InfoLeft = (): React.ReactNode => {
  const permissionLevel = useSelector(
    (state) => state.quotation.permissionLevel,
  )

  return (
    <Box
      sx={{
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        width: '100px',
        maxWidth: '100px',
        height: '18px',
      }}
    >
      <Box
        sx={{
          fontWeight: 500,
          fontSize: '10px',
          color: 'grey',
          userSelect: 'none',
        }}
      >
        {permissionLevel ?? ''}
      </Box>
    </Box>
  )
}
