import { Box } from '@mui/material'
import { theme } from '@shared/theme'

type Props = {
  children: React.ReactNode
}

export const GridPageLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      sx={{
        mt: '5px',
        height: `calc(100vh - ${String(theme.nav.height + theme.footer.height + 60)}px)`,
      }}
    >
      {props.children}
    </Box>
  )
}
