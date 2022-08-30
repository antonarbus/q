import { EventType } from '@src/types'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { Backdrop } from '@components/Common/Backdrop'
import { Card } from '@components/Common/Card'
import { useSlideElement } from '@functions/useSlideElement'

export function Reset() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>

  async function mailResetPasswordLink(e: EventType) {
    e.preventDefault()
    alert('mail reset password link')
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email })
    const options = { method, headers, body }
    // todo: for error messages make a separate route with a sliding card
    const res = await fetch('/api/reset', options)
    const data = await res.json()
    console.log(data)
    if (data.status === 'error') {
      alert(data.message)
      return localStorage.removeItem('accessJwtToken')
    }
    alert('check your mail box')
  }

  useEffect(() => useSlideElement({ intoView: true, element: cardRef.current, cb: () => inputRef.current.focus() }), [])

  return (
    <Backdrop
      onMouseDown={() => useSlideElement({ intoView: false, element: cardRef.current, cb: () => navigate('/') })}
    >
      <Card
        reference={cardRef}
        title='Reset password'
      >
        <form onSubmit={mailResetPasswordLink}>
          <TextField
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            placeholder='Email address'
            value={email}
            onChange={e => setEmail((e.target as HTMLInputElement).value)}
            inputRef={inputRef}
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 2, alignSelf: 'center', padding: '10px' }}
            // todo: put rotating icon inside button while waiting for the api call response
            children='Reset'
          />
        </form>
      </Card>
    </Backdrop>
  )
}
