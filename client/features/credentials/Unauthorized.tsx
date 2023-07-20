import { Button } from '@mui/material'
import { theme } from 'client/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

export const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div css={{
      height: '100vh',
      marginTop: `-${theme.nav.fullHeight}px`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '3vw',
      color: 'grey',
    }}>
      <span>Unauthorized</span>
      <Button
        variant='contained'
        startIcon={<ArrowBackIcon />}
        sx={{ mt: 2 }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  )
}
