import { notify } from 'client/shared/ui/top_msg/notify'
import type { Dispatch, FormEvent, SetStateAction } from 'react'
import { useState } from 'react'
import type { HttpStatusType } from './types'
import type { RegisterReqBody, RegisterRes } from 'server/api/registerRouter'
import { apiUrl } from 'server/apiUrls'

type Props = {
  e: FormEvent
  email: string
  password: string
}

type FuncReturnType = {
  registerUser: ({ e, email, password }: Props) => Promise<void>
  httpStatus: HttpStatusType
  setHttpStatus: Dispatch<SetStateAction<HttpStatusType>>
}

export const useRegister = (): FuncReturnType => {
  const [httpStatus, setHttpStatus] = useState<HttpStatusType>('')

  const registerUser = async ({ e, email, password }: Props): Promise<void> => {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const bodyObj: RegisterReqBody = { email, password }
    const body = JSON.stringify(bodyObj)
    const options = { method, headers, body }
    try {
      setHttpStatus('loading')
      const res = await fetch(apiUrl.register, options)
      const data = await res.json() as RegisterRes
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
