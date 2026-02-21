import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const ButtonsGroupLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '2px',
      }}
    >
      {props.children}
    </Box>
  )
}
