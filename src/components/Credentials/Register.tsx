import { EventType } from '@src/types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

// todo: add email typo checker (https://www.npmjs.com/package/mailcheck)

export function Register() {
  const [open, setOpen] = useState(true)
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' })
  const [validateEmailOnType, setValidateEmailOnType] = useState(false)
  const [validateConfirmPasswordOnType, setValidateConfirmPasswordOnType] = useState(false)
  const [emailOk, setEmailOk] = useState(false)
  const [confirmPasswordOk, setConfirmPasswordOk] = useState(false)

  const handleInputsChange = (e: EventType) => {
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

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const isEmailPatternOk = (email: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  const alertIncorrectEmail = () => {
    if (credentials.email.length === 0) return
    if (isEmailPatternOk(credentials.email)) {
      setEmailOk(true)
      return
    }
    setEmailOk(false)
    setValidateEmailOnType(true)
  }
  useEffect(function alertIncorrectEmailOnInput() {
    if (!validateEmailOnType) return // do not check before we type email and detect that is in incorrect on blur event
    isEmailPatternOk(credentials.email) ? setEmailOk(true) : setEmailOk(false)
  }, [credentials.email])

  const alertMismatchedPasswords = () => {
    if (credentials.password === credentials.confirmPassword) {
      setConfirmPasswordOk(true)
      return
    }
    setConfirmPasswordOk(false)
    setValidateConfirmPasswordOnType(true)
  }
  useEffect(function alertMismatchedPasswordsOnInput() {
    if (!validateConfirmPasswordOnType) return
    (credentials.password === credentials.confirmPassword) ? setConfirmPasswordOk(true) : setConfirmPasswordOk(false)
  }, [credentials.password, credentials.confirmPassword])

  return (
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
                <LockIcon />
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
                      fullWidth
                      id="email"
                      label={(validateEmailOnType && !emailOk && credentials.email.length > 0) ? 'Email pattern is wrong' : 'Email'}
                      name="email"
                      autoComplete="email"
                      placeholder='Email'
                      value={credentials.email}
                      onChange={handleInputsChange}
                      onBlur={alertIncorrectEmail}
                      autoFocus
                      css={{
                        '& .MuiInputLabel-shrink': {
                          color: (validateEmailOnType && !emailOk && credentials.email.length > 0) ? 'red' : ''
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      label='Password'
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      placeholder='Password'
                      value={credentials.password}
                      onChange={handleInputsChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      label={(validateConfirmPasswordOnType && !confirmPasswordOk && credentials.confirmPassword.length > 0) ? 'Passwords do not match' : 'Confirm password'}
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      placeholder='Password'
                      value={credentials.confirmPassword}
                      onChange={handleInputsChange}
                      onBlur={alertMismatchedPasswords}
                      css={{
                        '& .MuiInputLabel-shrink': {
                          color: (validateConfirmPasswordOnType && !confirmPasswordOk && credentials.confirmPassword.length > 0) ? 'red' : ''
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={!emailOk || !confirmPasswordOk || credentials.password.length === 0}
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
  )
}
