import { notify } from '@features/notifier/notify'
import { slideElement } from '@functions/slideElement'
import { globalObject } from '@src/globalObject'
import { useDispatchTyped } from '@src/store'
import { EventType, httpStatusType } from '@src/types'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { credentialsSlice, rememberLoggedUser } from './credentialsSlice'
import { navUpdate } from './navUpdate'

export function useLogin() {
  const [httpStatus, setHttpStatus] = useState<httpStatusType>('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/'
  const dispatch = useDispatchTyped()

  type Props = {
    e: EventType
    email: string
    password: string
    cardElement: HTMLElement
  }

  async function loginUser ({ e, email, password, cardElement }: Props) {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email, password })
    const options = { method, headers, body }
    try {
      setHttpStatus('loading')
      const res = await fetch('/api/login', options)
      const data = await res.json()
      const { status, message, accessJwtToken, roles } = data

      if (status === 'error') {
        setHttpStatus('error')
        globalObject.accessJwtToken = ''
        if (message === 'invalid credentials') {
          notify({ msg: 'Invalid credentials', type: 'error', theme: 'light' })
        }
        if (message === 'account is not activated') {
          notify({ msg: 'Account is not activated. Check mailbox.', type: 'error', theme: 'light' })
        }
        return
      }

      if (status === 'ok') {
        setHttpStatus('success')
        globalObject.accessJwtToken = accessJwtToken
        dispatch(rememberLoggedUser({ email, isLogged: true, roles }))
        // notify({ msg: 'Logged in!', theme: 'light', closeAfterMs: 3000 })
        navUpdate.login()
        setTimeout(() => slideElement({ element: cardElement, cb: () => navigate(from, { replace: true }) }), 1000)
      }
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
      setTimeout(() => slideElement({ element: cardElement, cb: () => navigate(from, { replace: true }) }), 1000)
    }
  }

  return { loginUser, httpStatus, setHttpStatus }
}
