import { theme } from '@shared/theme'
import { Box } from '@mui/material'
import type { JSX,ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const GridPageLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        mt: '5px',
        height: `calc(100vh - ${String(theme.nav.height + theme.footer.height + 60)}px)`,
      }}
    >
      {children}
    </Box>
  )
}
