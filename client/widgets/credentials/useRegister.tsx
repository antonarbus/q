import { notify } from 'client/shared/ui/top_msg/notify'
import type { FormEvent } from 'react'
import { useState } from 'react'
import type { HttpStatusType } from './types'

interface Props {
  e: FormEvent
  email: string
  password: string
}

export const useRegister = () => {
  const [httpStatus, setHttpStatus] = useState<HttpStatusType>('')

  const registerUser = async ({ e, email, password }: Props): Promise<void> => {
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
      if (status === 'error') {
        setHttpStatus('error')
      }
      if (status === 'error' && message === 'user with such email already exists') {
        notify({ msg: 'Already registered', type: 'info', theme: 'light' })
      }
      if (status === 'ok') {
        setHttpStatus('success')
        notify({ msg: 'Done! Check your mailbox.', theme: 'light' })
      }
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }

  return { registerUser, httpStatus, setHttpStatus }
}
