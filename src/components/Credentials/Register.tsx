import { EventType } from '@src/types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Container, Box, Grid, CssBaseline, Button, DialogContent, Dialog, Avatar } from '@mui/material'
import { theme } from '@src/theme'
import { LockOutlined } from '@mui/icons-material'
import { notify } from '@components/Notifier/notify'
import { EmailInput } from './common/EmailInput'
import { PasswordInput } from './common/PasswordInput'
import { ConfirmPasswordInput } from './common/ConfirmPasswordInput'

export function Register() {
  const navigate = useNavigate()

  // sort out
  const [open, setOpen] = useState(true)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    navigate('/')
  }

  // input values

  const [email, setEmail] = useState('')
  const [isEmailOk, setIsEmailOk] = useState(false)
  const [password, setPassword] = useState('')
  const [isConfirmPasswordOk, setIsConfirmPasswordOk] = useState(false)

  // disable button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  useEffect(() => setIsButtonDisabled(!(isEmailOk && isConfirmPasswordOk)), [isEmailOk, isConfirmPasswordOk])

  type Props = {
    e: EventType
    email: string
    password: string
  }
  async function registerUser({ e, email, password }: Props) {
    e.preventDefault()
    try {
      const method = 'POST'
      const headers = { 'Content-Type': 'application/json' }
      const body = JSON.stringify({ email, password })
      const options = { method, headers, body }
      const res = await fetch('/api/register', options)
      const data = await res.json()
      data.status === 'error' && data.message === 'user with such email already exists' && notify({ msg: 'Already registered', type: 'info', theme: 'light' })
      data.status === 'ok' && notify({ msg: 'Check your email and confirm registration.', theme: 'light' })
      console.log(data)
    } catch (err) {
      console.log(err)
      notify({ msg: 'Registration failed', type: 'error', theme: 'light' })
    } finally {
      // remove spinner from the button
    }
  }

  // todo: use my custom button with success and error state
  // todo: use custom card with animation
  // todo: remove Grid

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      BackdropProps={{ transitionDuration: 0 }}
    >
      <DialogContent>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}><LockOutlined /></Avatar>
            <Typography component="h1" variant="h5">Register</Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e: EventType) => registerUser({ e, email, password })}
              sx={{ mt: 3 }}
            >
              <EmailInput email={email} setEmail={setEmail} isEmailOk={isEmailOk} setIsEmailOk={setIsEmailOk} />
              <PasswordInput password={password} setPassword={setPassword} />
              <ConfirmPasswordInput originalPassword={password} isConfirmPasswordOk={isConfirmPasswordOk} setIsConfirmPasswordOk={setIsConfirmPasswordOk} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isButtonDisabled}
                size='large'
                sx={{ mt: 2, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Have an account? Log in...</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  )
}
