import { EventType } from '@src/types'
import { forwardRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  const navigate = useNavigate()
  return <Slide direction="up" ref={ref} {...props} onExited={() => navigate('/')} />
})

// todo: store user data in redux

export function UpdatePassword() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const handleChange = (e: EventType) => {
    const target = e.target as HTMLInputElement
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  async function loginUser(e: EventType) {
    e.preventDefault()
    alert('Update password form')
    // const method = 'POST'
    // const headers = { 'Content-Type': 'application/json' }
    // const { email, password } = credentials
    // const body = JSON.stringify({ email, password })
    // const options = { method, headers, body }
    // const res = await fetch('/api/login', options)
    // const data = await res.json()
    // console.log(data)
    // if (data.status === 'error') {
    //   alert(data.message)
    //   return localStorage.removeItem('accessJwtToken')
    // }
    // localStorage.setItem('accessJwtToken', data.accessJwtToken)
    // alert('logged in')
    // navigate('/')
  }

  const [open, setOpen] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    // navigate('/')
  }

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        BackdropProps={{ transitionDuration: 0 }}
      >
        <DialogContent>
          <Container maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
              >
                Reset password
              </Typography>
              <Box
                component="form"
                onSubmit={loginUser}
                noValidate sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                // autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                // autoFocus
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Save password
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/resetPassword">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register">No account yet? Sign Up</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
  )
}
