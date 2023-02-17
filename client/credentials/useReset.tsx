import { notify } from 'client/notifier/notify'
import { EventType, HttpStatusType } from 'client/types'
import { useState } from 'react'
import { token } from './token'

type Props = {
  e: EventType
  email: string
}

export function useReset() {
  const [httpStatus, setHttpStatus] = useState<HttpStatusType>('')

  async function resetPassword({ e, email }: Props) {
    e.preventDefault()
    setHttpStatus('loading')
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email })
    const options = { method, headers, body }
    try {
      // todo: create a /reset api
      const res = await fetch('/api/reset', options)
      const data = await res.json()
      if (data.status === 'error') {
        setHttpStatus('error')
        token.access = ''
      }

      if (data.status === 'ok') {
        setHttpStatus('success')
        notify({ msg: 'Check your email box', theme: 'light', closeAfterMs: 5000 })
      }
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Reset password failed', type: 'error', theme: 'light' })
    }
  }

  return { resetPassword, httpStatus, setHttpStatus }
}
