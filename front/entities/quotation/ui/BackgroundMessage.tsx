import { Box } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux'

export const BackgroundMessage = (): React.JSX.Element => {
  const backgroundMessage = reduxHolder.useSelector((state) => state.app.backgroundMessage)

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
      }}
    >
      {backgroundMessage}
    </Box>
  )
}
