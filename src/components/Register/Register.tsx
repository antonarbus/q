import { EventType } from '@src/types'
import { forwardRef, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const Transition = forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement<any, any>; }, ref: React.Ref<unknown>) {
  const navigate = useNavigate()
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
      onExited={() => navigate('/')}
    />)
})

const theme = createTheme()

export function Register() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const handleChange = (e: EventType) => {
    const target = (e.target as HTMLInputElement)
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  async function registerUser(e: EventType) {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify(credentials)
    const options = { method, headers, body }
    const res = await fetch('/api/register', options)
    const data = await res.json()
    console.log(data)
  }

  const [open, setOpen] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>

      <LoginStyled>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder='Email'
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder='Password'
            value={credentials.password}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
          </LoginStyled>

          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    // autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}

const LoginStyled = styled.div`
  input {
    display: block;
    width: 300px;
    outline: none;
    border: 1px solid #c4c4c4;
    border-radius: 6px;
    /* box-shadow: inset #00000033 0px 0px 3px 0px; */
    padding: 10px 10px 10px 10px;
  }
`
