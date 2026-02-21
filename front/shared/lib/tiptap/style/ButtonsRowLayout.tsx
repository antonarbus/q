import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const ButtonsRowLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {props.children}
    </Box>
  )
}
