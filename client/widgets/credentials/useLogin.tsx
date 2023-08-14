import { notify } from 'client/shared/ui/top_msg/notify'
import { useDispatchTyped } from 'client/shared/hooks'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { navUpdate } from './navUpdate'
import { token } from '../../shared/auth/token'
import type { HttpStatusType } from './types'
import { rememberLoggedUser } from 'client/entities/user'
import { slideElement } from 'client/shared/lib/slideElement'

export const useLogin = () => {
  const [httpStatus, setHttpStatus] = useState<HttpStatusType>('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? '/'
  const dispatch = useDispatchTyped()

  interface IProps {
    e: FormEvent
    email: string
    password: string
    cardElement: HTMLElement
  }

  const loginUser = async ({ e, email, password, cardElement }: IProps) => {
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
        token.access = ''
        if (message === 'invalid credentials') {
          notify({ msg: 'Invalid credentials', type: 'error', theme: 'light' })
        }
        if (message === 'account is not activated') {
          notify({
            msg: 'Account is not activated. Check mailbox.',
            type: 'error',
            theme: 'light',
          })
        }
        return
      }

      if (status === 'ok') {
        setHttpStatus('success')
        token.access = accessJwtToken
        dispatch(rememberLoggedUser({ email, isLogged: true, roles }))
        // notify({ msg: 'Logged in!', theme: 'light', closeAfterMs: 3000 })
        navUpdate.login()
        setTimeout(() => {
          slideElement({
            element: cardElement,
            cb: () => {
              navigate(from, { replace: true })
            },
          })
        }, 2000)
      }
      console.log(data)
    } catch (err) {
      setHttpStatus('error')
      console.log(err)
      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
      setTimeout(() => {
        slideElement({
          element: cardElement,
          cb: () => {
            navigate(from, { replace: true })
          },
        })
      }, 2000)
    }
  }

  return { loginUser, httpStatus, setHttpStatus }
}
