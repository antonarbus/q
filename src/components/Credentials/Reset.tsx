import { EventType } from '@src/types'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { Backdrop } from '@components/Common/Backdrop'
import { Card } from '@components/Common/Card'
import { useSlideElement } from '@functions/useSlideElement'
import { useEffectOnce } from 'react-use'
import { ButtonWithSuccess } from '@components/Common/ButtonWithSuccess'

export function Reset() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>
  type httpStatusType = 'loading' | 'error' | 'success' | ''
  const [httpStatus, setHttpStatus] = useState<httpStatusType>('')

  async function mailResetPasswordLink(e: EventType) {
    e.preventDefault()
    setHttpStatus('loading')
    console.log('mail reset password link')
    try {
      const method = 'POST'
      const headers = { 'Content-Type': 'application/json' }
      const body = JSON.stringify({ email })
      const options = { method, headers, body }
      const res = await fetch('/api/reset', options)
      const data = await res.json()
      console.log(data)
      if (data.status === 'error') {
        alert(data.message)
        setHttpStatus('error')
        return localStorage.removeItem('accessJwtToken')
      }
      alert('check your mail box')
      setHttpStatus('success')
    } catch (err) {
      console.log(err)
      setHttpStatus('error')
    }
  }

  useEffectOnce(() => useSlideElement({ intoView: true, element: cardRef.current, cb: () => inputRef.current.focus() }))

  return (
    <Backdrop
      onMouseDown={() => useSlideElement({ element: cardRef.current, cb: () => navigate('/') })}
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
            children='Reset'
          />
          <ButtonWithSuccess
            type='submit'
            content='Reset'
            httpStatus={httpStatus}
            setHttpStatus={setHttpStatus}
          />
        </form>
      </Card>
    </Backdrop>
  )
}
