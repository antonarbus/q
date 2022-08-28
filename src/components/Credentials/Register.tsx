import { EventType } from '@src/types'
import { forwardRef, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { TransitionProps } from '@mui/material/transitions'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
// import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Fade, Zoom, Slide } from '@mui/material'

const theme = createTheme()

const validateEmail = (email: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase())
const validatePassword = (password: string) => password.trim().length !== 0
const validateConfirmPassword = (password: string, confirmEmail: string) => password === confirmEmail

export function Register() {
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' })
  const handleChange = (e: EventType) => {
    const target = (e.target as HTMLInputElement)
    setCredentials({ ...credentials, [target.name]: target.value })
  }
  const navigate = useNavigate()

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

  useEffect(function isEmailValid() {
    console.log(validateEmail(credentials.email))
  }, [credentials.email])

  useEffect(function isPasswordValid() {
    console.log(validatePassword(credentials.password))
  }, [credentials.password])

  useEffect(function isConfirmPasswordValid() {
    console.log(validateConfirmPassword(credentials.password, credentials.confirmPassword))
  }, [credentials.password, credentials.confirmPassword])

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={registerUser}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email address"
                      name="email"
                      autoComplete="email"
                      placeholder='Email'
                      value={credentials.email}
                      onChange={handleChange}
                      // inputRef={emailRef}
                      autoFocus
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
                      placeholder='Password'
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      placeholder='Password'
                      value={credentials.confirmPassword}
                      onChange={handleChange}
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
                    <Link to="/login" >
                      Already have an account? Sign in</Link>
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
