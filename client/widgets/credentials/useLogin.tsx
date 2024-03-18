import { dispatch } from '@lib_instances/store'
import type { Dispatch, FormEvent, SetStateAction } from 'react'
import { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import type { LoginApiRes } from 'server/api/loginRouter'
import { apiUrl } from 'server/consts/apiUrl'
import { navUpdate } from '@features/log_out'
import { useGetQuotationQuery, useGetQuotationsQuery } from '@entities/quotation'
import { userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { notify } from '@shared/ui/top_msg/notify'
import { slideElement } from '@shared/utils/slideElement'
import type { HttpStatusType } from './types'

type StateProps = {
  from?: {
    [key: string]: unknown
    pathname: string
  }
}

type Props = {
  e: FormEvent
  email: string
  password: string
  cardElement: HTMLElement
}

// todo: type should come form the router
type FuncRes = {
  loginUser: ({ e, email, password, cardElement }: Props) => Promise<void>
  httpStatus: HttpStatusType
  setHttpStatus: Dispatch<SetStateAction<HttpStatusType>>
}

export const useLogin = (): FuncRes => {
  const [httpStatus, setHttpStatus] = useState<HttpStatusType>('')
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const from = (location.state as StateProps | undefined)?.from?.pathname ?? '/'
  const { refetch: refetchQuotation } = useGetQuotationQuery()
  const { refetch: refetchQuotations } = useGetQuotationsQuery()

  // todo: mode fetch func into api at user entity

  const loginUser = async ({ e, email, password, cardElement }: Props): Promise<void> => {
    e.preventDefault()
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email, password })
    const options = { method, headers, body }

    try {
      setHttpStatus('loading')
      const res = await fetch(apiUrl.login, options)
      const data: LoginApiRes = await res.json()
      const { status, message, accessJwtToken, roles } = data

      if (status === 'error') {
        setHttpStatus('error')
        accessTokenSignal.value = null

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
        accessTokenSignal.value = accessJwtToken
        dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))
        navUpdate.login()

        setTimeout(() => {
          slideElement({
            element: cardElement,
            cb: () => {
              if (location.pathname.includes(route.quotations)) {
                void refetchQuotations()
              }
              if (id) {
                void refetchQuotation()
              }
              navigate('..', { replace: true, state: nanoid() })
            },
          })
        }, 2000)
      }
      console.info(data)
    } catch (err) {
      setHttpStatus('error')
      console.error(err)
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
