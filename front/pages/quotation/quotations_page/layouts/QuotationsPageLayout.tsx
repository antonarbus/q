import { theme } from '@lib_instances/theme'
import { Box } from '@mui/material'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const QuotationsPageLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      sx={{
        mt: '5px',
        height: `calc(100vh - ${String(theme.nav.height + 60)}px)`,
      }}
    >
      {children}
    </Box>
  )
}
