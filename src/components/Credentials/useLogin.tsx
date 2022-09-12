import { notify } from '@components/Notifier/notify'
import { EventType, httpStatusType } from '@src/types'
import { useState } from 'react'

type Props = {
  e: EventType
  email: string
  password: string
}

export function useLogin() {
  const [httpStatus, setHttpStatus] = useState<httpStatusType>('')

  async function loginUser ({ e, email, password }: Props) {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email, password })
    const options = { method, headers, body }
    try {
      setHttpStatus('loading')
      const res = await fetch('/api/login', options)
      const data = await res.json()
      data.status === 'error' && setHttpStatus('error')
      data.status === 'error' && localStorage.removeItem('accessJwtToken')
      data.status === 'error' && notify({ msg: 'Could not log in', type: 'error', theme: 'light', closeAfterMs: 5000 })
      data.status === 'ok' && setHttpStatus('success')
      data.status === 'ok' && localStorage.setItem('accessJwtToken', data.accessJwtToken)
      data.status === 'ok' && notify({ msg: 'Logged in', theme: 'light', closeAfterMs: 5000 })
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Login failed', type: 'error', theme: 'light' })
    }
  }

  return { loginUser, httpStatus, setHttpStatus }
}
