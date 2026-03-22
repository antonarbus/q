import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const BoqColumnsLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      className='header tr'
      style={{
        alignItems: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      {props.children}
    </Box>
  )
}
