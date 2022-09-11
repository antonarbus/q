import { notify } from '@components/Notifier/notify'
import { EventType, httpStatusType } from '@src/types'
import { useState } from 'react'

type Props = {
  e: EventType
  email: string
  password: string
}

export function useRegisterUser() {
  const [httpStatus, setHttpStatus] = useState<httpStatusType>('')

  async function registerUser ({ e, email, password }: Props) {
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
      data.status === 'error' && data.message === 'user with such email already exists' && notify({ msg: 'Already registered', type: 'info', theme: 'light', closeAfterMs: 10000 })
      data.status === 'ok' && setHttpStatus('success')
      data.status === 'ok' && notify({ msg: 'Check your email and confirm registration.', theme: 'light', closeAfterMs: 10000 })
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Registration failed', type: 'error', theme: 'light' })
    }
  }

  return { registerUser, httpStatus, setHttpStatus }
}
