import { Box } from '@mui/material'
import { liquidGlassStyle } from './liquidGlassStyle'

type Props = {
  children: React.ReactNode
}

export const TiptapMenuLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        padding: '6px 8px',
        ...liquidGlassStyle,
      }}
    >
      {props.children}
    </Box>
  )
}
