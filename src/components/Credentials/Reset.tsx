import { EventType } from '@src/types'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Backdrop } from '@components/Common/Backdrop'
import { Card } from '@components/Common/Card'
import { useSlideElement } from '@functions/useSlideElement'

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

  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => useSlideElement({ intoView: true, element: cardRef.current, cb: () => inputRef.current.focus() }), [])

  return (
    <Backdrop
      onMouseDown={() => useSlideElement({ intoView: false, element: cardRef.current, cb: () => navigate('/') })}
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
            // autoFocus
            inputRef={inputRef}
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
