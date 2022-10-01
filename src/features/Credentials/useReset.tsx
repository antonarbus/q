import { notify } from '@features/notifier/notify'
import { globalObject } from '@src/globalObject'
import { EventType, httpStatusType } from '@src/types'
import { useState } from 'react'

type Props = {
  e: EventType
  email: string
}

export function useReset() {
  const [httpStatus, setHttpStatus] = useState<httpStatusType>('')

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
        // localStorage.removeItem('accessJwtToken')
        globalObject.accessJwtToken = ''
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
