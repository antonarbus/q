import { EventType, httpStatusType } from '@src/types'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { BackdropCustom } from '@components/Common/BackdropCustom'
import { CardCustom } from '@components/Common/CardCustom'
import { useSlideElement } from '@functions/useSlideElement'
import { useEffectOnce } from 'react-use'
import { ButtonCustom } from '@components/Common/ButtonCustom'

export function Reset() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const inputRef = useRef() as React.MutableRefObject<HTMLDivElement>
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

  // todo: probably add slide element prop right into BackdropCustom component

  useEffectOnce(() => useSlideElement({ intoView: true, element: cardRef.current, cb: () => inputRef.current.focus() }))

  return (
    <BackdropCustom
      onMouseDown={() => useSlideElement({ element: cardRef.current, cb: () => navigate('/') })}
    >
      <CardCustom
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
          <ButtonCustom
            type='submit'
            httpStatus={httpStatus}
            setHttpStatus={setHttpStatus}
            content='Reset'
          />
        </form>
      </CardCustom>
    </BackdropCustom>
  )
}
