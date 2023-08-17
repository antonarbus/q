import { notify } from 'client/shared/ui/top_msg/notify'
import { useDispatchTyped } from 'client/shared/hooks'
import type { Dispatch, FormEvent, SetStateAction } from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { navUpdate } from './navUpdate'
import { token } from '../../shared/auth/token'
import type { HttpStatusType } from './types'
import { rememberLoggedUser } from 'client/entities/user'
import { slideElement } from 'client/shared/lib/slideElement'
import type { TLoginApiRes } from 'server/api/loginRouter'

interface TState {
  from?: {
    [key: string]: unknown
    pathname: string
  }
}

interface IProps {
  e: FormEvent
  email: string
  password: string
  cardElement: HTMLElement
}

interface TResponse {
  loginUser: ({ e, email, password, cardElement }: IProps) => Promise<void>;
  httpStatus: HttpStatusType;
  setHttpStatus: Dispatch<SetStateAction<HttpStatusType>>;
}

export const useLogin = (): TResponse => {
  const [httpStatus, setHttpStatus] = useState<HttpStatusType>('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as TState | undefined)?.from?.pathname ?? '/'
  const dispatch = useDispatchTyped()



  const loginUser = async ({ e, email, password, cardElement }: IProps): Promise<void> => {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email, password })
    const options = { method, headers, body }
    try {
      setHttpStatus('loading')
      const res = await fetch('/api/login', options)
      const data = await res.json() as TLoginApiRes
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

      if (status === 'ok' && accessJwtToken) {
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
