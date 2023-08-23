import { notify } from 'client/shared/ui/top_msg/notify'
import type { Dispatch, FormEvent, SetStateAction } from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { navUpdate } from './navUpdate'
import { token } from '../../shared/auth/token'
import type { HttpStatusType } from './types'
import { slideElement } from 'client/shared/lib/slideElement'
import type { LoginApiRes } from 'server/api/loginRouter'
import { apiUrl } from 'server/apiUrls'
import { userSlice } from 'client/entities/user'
import { dispatch } from 'client/shared/clients'

interface StateProps {
  from?: {
    [key: string]: unknown
    pathname: string
  }
}

interface Props {
  e: FormEvent
  email: string
  password: string
  cardElement: HTMLElement
}

interface FuncRes {
  loginUser: ({ e, email, password, cardElement }: Props) => Promise<void>;
  httpStatus: HttpStatusType;
  setHttpStatus: Dispatch<SetStateAction<HttpStatusType>>;
}

export const useLogin = (): FuncRes => {
  const [httpStatus, setHttpStatus] = useState<HttpStatusType>('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as StateProps | undefined)?.from?.pathname ?? '/'

  const loginUser = async ({ e, email, password, cardElement }: Props): Promise<void> => {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email, password })
    const options = { method, headers, body }
    try {
      setHttpStatus('loading')
      const res = await fetch(apiUrl.login, options)
      const data = await res.json() as LoginApiRes
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
        dispatch(userSlice.actions.rememberLoggedUser({ email, isLogged: true, roles }))
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
