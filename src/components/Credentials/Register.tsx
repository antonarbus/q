import { EventType } from '@src/types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Container, Box, DialogContent, Dialog, Avatar } from '@mui/material'
import { theme } from '@src/theme'
import { LockOutlined } from '@mui/icons-material'
import { EmailInput } from './common/EmailInput'
import { PasswordInput } from './common/PasswordInput'
import { ConfirmPasswordInput } from './common/ConfirmPasswordInput'
import { ButtonWithSuccess } from '@components/Common/ButtonWithSuccess'
import { useRegisterUser } from './useRegister'

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
  const { registerUser, httpStatus, setHttpStatus } = useRegisterUser()
  useEffect(() => setIsButtonDisabled(!(isEmailOk && isConfirmPasswordOk)), [isEmailOk, isConfirmPasswordOk])

  // todo: use custom card with animation

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
