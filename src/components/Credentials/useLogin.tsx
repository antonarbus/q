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
      const { status, message, accessJwtToken } = data
      status === 'error' && setHttpStatus('error')
      status === 'error' && localStorage.removeItem('accessJwtToken')
      status === 'error' && message === 'invalid credentials' && notify({ msg: 'Invalid credentials', type: 'error', theme: 'light' })
      status === 'error' && message === 'account is not activated' && notify({ msg: 'Account is not activated. Check mailbox.', type: 'error', theme: 'light' })
      status === 'ok' && setHttpStatus('success')
      status === 'ok' && localStorage.setItem('accessJwtToken', accessJwtToken)
      status === 'ok' && notify({ msg: 'Logged in!', theme: 'light' })
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }

  return { loginUser, httpStatus, setHttpStatus }
}
