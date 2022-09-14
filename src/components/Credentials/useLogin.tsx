import { notify } from '@components/Notifier/notify'
import { slideElement } from '@functions/slideElement'
import { login } from '@redux/slices/userSlice'
import { useDispatchTyped } from '@redux/store/storeHooks'
import { EventType, httpStatusType } from '@src/types'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

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
      const { status, message, accessJwtToken } = data
      if (status === 'error') {
        setHttpStatus('error')
        localStorage.removeItem('accessJwtToken')
        message === 'invalid credentials' && notify({ msg: 'Invalid credentials', type: 'error', theme: 'light' })
        message === 'account is not activated' && notify({ msg: 'Account is not activated. Check mailbox.', type: 'error', theme: 'light' })
        return
      }
      if (status === 'ok') {
        setHttpStatus('success')
        localStorage.setItem('accessJwtToken', accessJwtToken)
        dispatch(login({ email, isLogged: true, role: 'viewer' }))
        notify({
          msg: 'Logged in!',
          theme: 'light',
          closeAfterMs: 1000,
          onClose: () => {
            slideElement({ element: cardElement, cb: () => navigate(from, { replace: true }) })
          }
        })
      }
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }

  return { loginUser, httpStatus, setHttpStatus }
}
