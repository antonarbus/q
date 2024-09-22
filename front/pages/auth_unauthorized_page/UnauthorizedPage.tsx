import { theme } from '@lib_instances/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const UnauthorizedPage = (): React.JSX.Element => {
  const navigate = useNavigate()

  return (
    <div
      css={{
        height: '100vh',
        marginTop: `-${String(theme.nav.fullHeight)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3vw',
        color: 'grey',
      }}
    >
      <span>Unauthorized</span>
      <Button
        variant='contained'
        startIcon={<ArrowBackIcon />}
        sx={{ mt: 2 }}
        onClick={(): void => {
          navigate(-1)
        }}
      >
        Back
      </Button>
    </div>
  )
}
