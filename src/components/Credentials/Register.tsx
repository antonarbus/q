import { EventType, httpStatusType } from '@src/types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Container, Box, Grid, CssBaseline, Button, DialogContent, Dialog, Avatar } from '@mui/material'
import { theme } from '@src/theme'
import { LockOutlined } from '@mui/icons-material'
import { notify } from '@components/Notifier/notify'
import { EmailInput } from './common/EmailInput'
import { PasswordInput } from './common/PasswordInput'
import { ConfirmPasswordInput } from './common/ConfirmPasswordInput'
import { ButtonWithSuccess } from '@components/Common/ButtonWithSuccess'

export function Register() {
  const navigate = useNavigate()

  // sort out
  const [open, setOpen] = useState(true)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    navigate('/')
  }

  const [email, setEmail] = useState('')
  const [isEmailOk, setIsEmailOk] = useState(false)
  const [password, setPassword] = useState('')
  const [isConfirmPasswordOk, setIsConfirmPasswordOk] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  useEffect(() => setIsButtonDisabled(!(isEmailOk && isConfirmPasswordOk)), [isEmailOk, isConfirmPasswordOk])
  const [httpStatus, setHttpStatus] = useState<httpStatusType>('')

  type Props = {
    e: EventType
    email: string
    password: string
  }
  async function registerUser({ e, email, password }: Props) {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email, password })
    const options = { method, headers, body }
    try {
      setHttpStatus('loading')
      const res = await fetch('/api/register', options)
      const data = await res.json()
      data.status === 'error' && setHttpStatus('error')
      data.status === 'error' && data.message === 'user with such email already exists' && notify({ msg: 'Already registered', type: 'info', theme: 'light' })
      data.status === 'ok' && setHttpStatus('success')
      data.status === 'ok' && notify({ msg: 'Check your email and confirm registration.', theme: 'light' })
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Registration failed', type: 'error', theme: 'light' })
    }
  }

  // todo: use custom card with animation
  // todo: move function level up

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      BackdropProps={{ transitionDuration: 0 }}
    >
      <DialogContent>
        <Container maxWidth="xs">
          <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}><LockOutlined /></Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>Register</Typography>
            <form onSubmit={(e: EventType) => registerUser({ e, email, password })}>
              <EmailInput email={email} setEmail={setEmail} isEmailOk={isEmailOk} setIsEmailOk={setIsEmailOk} />
              <PasswordInput password={password} setPassword={setPassword} />
              <ConfirmPasswordInput originalPassword={password} isConfirmPasswordOk={isConfirmPasswordOk} setIsConfirmPasswordOk={setIsConfirmPasswordOk} />
              <ButtonWithSuccess content='SIGN UP' disabled={isButtonDisabled} httpStatus={httpStatus} setHttpStatus={setHttpStatus} />
              <div css={{ textAlign: 'right', marginTop: '20px' }}><Link to="/login" style={{ alignSelf: 'flex-end' }}>Have an account? Log in...</Link></div>
            </form>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  )
}
