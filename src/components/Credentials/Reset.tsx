import { EventType } from '@src/types'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Backdrop } from '@components/Common/Backdrop'
import { Card } from '@components/Common/Card'
import { gsap } from 'gsap'
import { GrPowerReset as ResetIcon } from 'react-icons/gr'
import { theme } from '@src/theme'

export function Reset() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleChange = (e: EventType) => {
    const target = e.target as HTMLInputElement
    setCredentials({ ...credentials, [target.name]: target.value })
  }

  async function reset(e: EventType) {
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
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>

  function appearWithSlideUp() {
    const screenHeight = window.window.innerHeight
    const elementHeight = cardRef.current.offsetHeight
    const offsetPosition = screenHeight / 2 + elementHeight / 2
    gsap.fromTo(cardRef.current, { y: offsetPosition }, { duration: 0.3, y: 0 })
  }

  type Props = {
    onComplete?: () => void
  }

  /**
   * Animate card upwards off the screen and go to the root url '/'
   * @param props object with parameters
   * @param props.onComplete callback to be triggered after animation, for ex. we may call navigate('/url'), if no arg is provided url will be changed to '/'
   */

  function disappearWithSlideUp({ onComplete }: Props) {
    if (isAnimationPrevented) return
    isAnimationPrevented = true
    const screenHeight = window.window.innerHeight
    const elementHeight = cardRef.current.offsetHeight
    const offsetPosition = screenHeight / 2 + elementHeight / 2
    console.log(666)
    gsap.fromTo(cardRef.current, { y: 0 }, { duration: 0.3, y: -offsetPosition, onComplete: onComplete || (() => navigate('/')) })
  }

  useEffect(appearWithSlideUp, [])

  return (
    <Backdrop
      onMouseDown={disappearWithSlideUp}
    >
      <Card
        reference={cardRef}
        title='Reset password'
      >
        <Box
          component='form'
          onSubmit={reset}
        >
          <TextField
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            placeholder='Email address'
            value={credentials.email}
            onChange={handleChange}
            autoFocus
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 2, alignSelf: 'center', color: 'white', padding: '10px' }}
            children='Reset'
          />
        </Box>
      </Card>
    </Backdrop>
  )
}
