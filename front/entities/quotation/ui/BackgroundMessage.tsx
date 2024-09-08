import { Box } from '@mui/material'
import { backgroundMessageSignal } from '../signals/backgroundMessageSignal'

export const BackgroundMessage = (): JSX.Element => {
  return (
    <Box
      className='background-message'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        position: 'absolute',
        top: 170,
        right: 5,
        left: 5,
        fontSize: '20px',
        fontWeight: 500,
        color: 'grey',
        textAlign: 'center',
        zIndex: -1,
      }}
    >
      {backgroundMessageSignal.value}
    </Box>
  )
}
