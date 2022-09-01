import { EventType } from '@src/types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Container, Box, Grid, TextField, CssBaseline, Button, DialogContent, Dialog, InputAdornment, IconButton, Avatar } from '@mui/material'
import mailcheck from 'mailcheck'
import { theme } from '@src/theme'
import { Visibility, VisibilityOff, Lock, Person } from '@mui/icons-material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
// import PersonIcon from '@mui/icons-material/Person'
// import LockIcon from '@mui/icons-material/Lock'

export function Register() {
  const navigate = useNavigate()

  // sort out
  const [open, setOpen] = useState(true)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    navigate('/')
  }

  // show password

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // input values
  const [inputValue, setInputValue] = useState({ email: '', password: '', confirmPassword: '' })
  const handleInputValueChange = (e: EventType) => {
    const target = (e.target as HTMLInputElement)
    setInputValue({ ...inputValue, [target.name]: target.value })
  }

  // input focused out ones (show validation msg only after first focus out)
  const [inputFocusedOutOnes, setInputFocusedOutOnes] = useState({ email: false, password: false, confirmPassword: false })
  const handleInputFocusedOutOnes = (e: EventType) => {
    const target = (e.target as HTMLInputElement)
    setInputFocusedOutOnes({ ...inputFocusedOutOnes, [target.name]: true })
  }

  // is email ok?
  const isEmailPatternOk = (email: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

  const [isEmailOk, setIsEmailOk] = useState(false)
  useEffect(() => {
    isEmailPatternOk(inputValue.email)
      ? setIsEmailOk(true)
      : setIsEmailOk(false)
  }, [inputValue.email])

  // is confirmPassword ok?
  const [isConfirmPasswordOk, setIsConfirmPasswordOk] = useState(false)
  useEffect(() => {
    (inputValue.password !== '' && inputValue.password === inputValue.confirmPassword)
      ? setIsConfirmPasswordOk(true)
      : setIsConfirmPasswordOk(false)
  }, [inputValue.password, inputValue.confirmPassword])

  // validation msg for email
  const initEmailLabel = 'Email'
  const [emailLabel, setEmailLabel] = useState(initEmailLabel)
  useEffect(() => {
    (inputFocusedOutOnes.email && inputValue.email !== '' && !isEmailOk)
      ? setEmailLabel('Check email pattern')
      : setEmailLabel(initEmailLabel)
  }, [inputValue.email, inputFocusedOutOnes.email, isEmailOk])

  // validation msg for password confirmation
  const initConfirmPasswordLabel = 'Confirm password'
  const [confirmPasswordLabel, setConfirmPasswordLabel] = useState(initConfirmPasswordLabel)
  useEffect(() => {
    inputFocusedOutOnes.confirmPassword && inputValue.password !== '' && inputValue.confirmPassword !== '' && !isConfirmPasswordOk
      ? setConfirmPasswordLabel('Passwords do not match')
      : setConfirmPasswordLabel(initConfirmPasswordLabel)
  }, [inputFocusedOutOnes.confirmPassword, inputValue.password, inputValue.confirmPassword, isConfirmPasswordOk])

  // todo: email pattern check move to a custom hook (useEmailValidation), it should be used in 3 places

  // email suggestion
  const [emailSuggestion, setEmailSuggestion] = useState('')

  const suggestEmail = (email?: string) => {
    mailcheck.run({
      email: email || inputValue.email,
      suggested: function (suggestion: any) {
        setEmailSuggestion(suggestion.full)
      },
      empty: function () {
        setEmailSuggestion('')
      }
    })
  }

  // disable button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  useEffect(() => {
    isEmailOk && isConfirmPasswordOk
      ? setIsButtonDisabled(false)
      : setIsButtonDisabled(true)
  }, [isEmailOk, isConfirmPasswordOk])

  async function registerUser(e: EventType) {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email: inputValue.email, password: inputValue.password })
    const options = { method, headers, body }
    const res = await fetch('/api/register', options)
    const data = await res.json()
    console.log(data)
  }

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
            <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
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
              <div css={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  id="email"
                  label={emailLabel}
                  name="email"
                  autoComplete="email"
                  placeholder='Email'
                  value={inputValue.email}
                  onChange={handleInputValueChange}
                  onBlur={(e) => {
                    handleInputFocusedOutOnes(e)
                    suggestEmail()
                  }}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    )
                  }}
                  css={{
                    '& .MuiInputLabel-shrink': {
                      color: (emailLabel !== initEmailLabel) ? theme.colors.red : ''
                    }
                  }}
                  sx={{ mb: 2 }}
                />
                {emailSuggestion && (
                  <div css={{ position: 'absolute', bottom: '18px', right: '5px', fontSize: '12px', color: theme.colors.red }} >
                    Did you mean? {' '}
                    <a
                      style={{ textDecoration: 'underline' }}
                      onClick={(e) => {
                        e.preventDefault()
                        setInputValue({ ...inputValue, email: emailSuggestion })
                        suggestEmail(emailSuggestion)
                      }}
                    >
                      {emailSuggestion}
                    </a>
                  </div>
                )}
              </div>
              <TextField
                fullWidth
                name="password"
                label='Password'
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                placeholder='Password'
                value={inputValue.password}
                onChange={handleInputValueChange}
                onBlur={handleInputFocusedOutOnes}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                name="confirmPassword"
                label={confirmPasswordLabel}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                placeholder='Password'
                value={inputValue.confirmPassword}
                onChange={handleInputValueChange}
                onBlur={handleInputFocusedOutOnes}
                css={{
                  '& .MuiInputLabel-shrink': {
                    color: (confirmPasswordLabel !== initConfirmPasswordLabel) ? theme.colors.red : ''
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
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
                  <Link to="/login" >Sign in?</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  )
}
