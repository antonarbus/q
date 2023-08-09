import { notify } from 'client/shared/ui/top_msg/notify'
import type { Event } from 'client/shared/types'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { token } from '../../shared/auth/token'
import type { HttpStatusType } from './types'

interface Props {
  e: Event
  email: string
}

interface IReturn {
  resetPassword: ({ e, email }: Props) => Promise<void>;
  httpStatus: HttpStatusType;
  setHttpStatus: Dispatch<SetStateAction<HttpStatusType>>;
}

export const useReset = (): IReturn => {
  const [httpStatus, setHttpStatus] = useState<HttpStatusType>('')

  const resetPassword = async ({ e, email }: Props): Promise<void> => {
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
        notify({
          msg: 'Check your email box',
          theme: 'light',
          closeAfterMs: 5000,
        })
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
