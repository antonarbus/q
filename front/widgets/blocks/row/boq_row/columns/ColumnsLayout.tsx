import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const ColumnsLayout = ({ children }: Props): JSX.Element => {
  return (
    <Box
      className='header tr'
      style={{
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}
