/* eslint-disable */

import { notify } from 'client/shared/ui/top_msg/notify'
import type { Dispatch, FormEvent, SetStateAction } from 'react'
import { useState } from 'react'
import { token } from '../../shared/auth/token'
import type { HttpStatusType } from './types'
import { apiUrl } from 'server/apiUrls'

interface Props {
  e: FormEvent
  email: string
}

interface ReturnFunc {
  resetPassword: ({ e, email }: Props) => Promise<void>;
  httpStatus: HttpStatusType;
  setHttpStatus: Dispatch<SetStateAction<HttpStatusType>>;
}

export const useReset = (): ReturnFunc => {
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
      const res = await fetch(apiUrl.reset, options)
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
