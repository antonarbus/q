import { notify } from 'client/features/notifier/notify'
import { Event } from 'client/types'
import { useState } from 'react'
import { HttpStatusType } from './types'

type Props = {
  e: Event
  email: string
  password: string
}

export function useRegister() {
  const [httpStatus, setHttpStatus] = useState<HttpStatusType>('')

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
      const { status, message } = data
      status === 'error' && setHttpStatus('error')
      status === 'error' && message === 'user with such email already exists' && notify({ msg: 'Already registered', type: 'info', theme: 'light' })
      status === 'ok' && setHttpStatus('success')
      status === 'ok' && notify({ msg: 'Done! Check your mailbox.', theme: 'light' })
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }

  return { registerUser, httpStatus, setHttpStatus }
}
