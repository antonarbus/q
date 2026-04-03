import { Box, Tooltip } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const InfoLeft = (): React.ReactNode => {
  const permissionLevel = reduxHolder.useSelector((state) => state.quotation.permissionLevel)

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
      <Tooltip title='Permission level'>
        <Box
          sx={{
            fontWeight: 500,
            color: 'grey',
            userSelect: 'none',
            textTransform: 'lowercase',
            '&::first-letter': {
              textTransform: 'uppercase',
            },
          }}
        >
          {permissionLevel === 'NEW' ? '' : permissionLevel}
        </Box>
      </Tooltip>
    </Box>
  )
}
