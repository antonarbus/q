import { EventType } from '@src/types'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Backdrop } from '@components/Common/Backdrop'
import { Card } from '@components/Common/Card'
import { gsap } from 'gsap'

const theme = createTheme()

// todo: make component as a dialog but connect it to the link via router-dom
// todo: store user data in redux

export function Reset() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const handleChange = (e: EventType) => {
    const target = e.target as HTMLInputElement
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  async function loginUser(e: EventType) {
    // e.preventDefault()
    // alert('reset password via email')
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

  let isAnimationPrevented = false // needed to avoid second click on backdrop which launches unwanted second animation
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(function appearWithSlideUp() {
    const screenHeight = window.window.innerHeight
    const elementHeight = ref.current.offsetHeight
    const offsetPosition = screenHeight / 2 + elementHeight / 2
    gsap.fromTo(ref.current, { y: offsetPosition }, { duration: 0.3, y: 0 })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        onClick={function disappearWithSlideUp() {
          if (isAnimationPrevented) return
          isAnimationPrevented = true
          const screenHeight = window.window.innerHeight
          const elementHeight = ref.current.offsetHeight
          const offsetPosition = screenHeight / 2 + elementHeight / 2
          gsap.fromTo(
            ref.current,
            { y: 0 },
            { duration: 0.3, y: -offsetPosition, onComplete: () => navigate('/') }
          )
        }}>

        <Card reference={ref}>
          <Avatar sx={{
            m: 1,
            bgcolor: 'black',
            alignSelf: 'center'
          }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              alignSelf: 'center',
              marginBottom: '20px'
            }}
          >
            Reset password
          </Typography>
          <Box
            component="form"
            onSubmit={loginUser}
            noValidate
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              placeholder="Email address"
              value={credentials.email}
              onChange={handleChange}
            // autoFocus
            />
            <Button
              type="submit"
              variant="contained"
              // color='warning'
              sx={{
                mt: 3,
                mb: 2,
                alignSelf: 'center'
              }}
            >
              Reset
            </Button>
          </Box>
        </Card>
      </Backdrop>

    </ThemeProvider>
  )
}
