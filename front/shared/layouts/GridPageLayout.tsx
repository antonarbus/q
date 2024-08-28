import { theme } from '@lib_instances/theme'
import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const GridPageLayout = ({ children }: Props): JSX.Element => {
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
