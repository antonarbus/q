import { dispatch } from '@shared/lib/redux'
import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import {
  type Location,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarksQuery } from '@entities/bookmark'
import {
  reLoadQuotationSignal,
  useGetQuotationsQuery,
} from '@entities/quotation'
import { useLogInMutation, userSlice, accessTokenSignal } from '@entities/user'
import { navItemKey } from '@shared/consts/navItemKey'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/toast'
import type { NavigateState } from '@shared/types/NavigateState'
import { asyncDelay } from '@shared/utils/delay'

type Props = {
  emailSignal: Signal<string>
  passwordSignal: Signal<string>
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useLogIn = ({
  emailSignal,
  passwordSignal,
  slideOut,
}: Props): Res => {
  const navigate = useNavigate()
  const { quotationId } = useParams()

  const {
    mutate: logIn,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useLogInMutation()

  const location = useLocation() as Location<NavigateState>
  const { refetch: refetchQuotations } = useGetQuotationsQuery()
  const { refetch: refetchBookmarks } = useGetBookmarksQuery()

  useUpdateEffect(() => {
    if (isSuccess) {
      const { accessJwtToken, email, roles, message } = data

      if (data.name === 'MongooseError') {
        notify({ msg: 'Database error', type: 'warn', theme: 'light' })

        return
      }

      if (message !== 'good password') {
        return
      }

      if (!accessJwtToken) {
        return
      }

      if (!email) {
        return
      }

      accessTokenSignal.value = accessJwtToken

      dispatch(
        userSlice.actions.rememberLoggedUser({
          email,
          roles: roles ?? ['user'],
        }),
      )

      dispatch(
        navSlice.actions.hideNavItems({ navItemIdKeys: [navItemKey.login] }),
      )

      dispatch(
        navSlice.actions.showNavItems({ navItemIdKeys: [navItemKey.profile] }),
      )

      if (roles?.includes('super-admin')) {
        dispatch(navSlice.actions.showNavItems({ navItemIdKeys: ['admin'] }))
      } else {
        dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: ['admin'] }))
      }

      if (location.pathname.includes(route.quotations)) {
        void refetchQuotations()
      }

      if (location.pathname.includes(route.bookmarks)) {
        void refetchBookmarks()
      }

      if (quotationId) {
        reLoadQuotationSignal.value = nanoid(5)
      }

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await slideOut()
        const navigateTo = location.state?.navigateTo

        if (typeof navigateTo === 'string') {
          navigate(navigateTo)

          return
        }

        navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      accessTokenSignal.value = null

      if (error.response?.data.message === 'not registered') {
        notify({ msg: 'Not registered', type: 'info', theme: 'light' })

        return
      }

      if (error.response?.data.message === 'bad password') {
        notify({ msg: 'Invalid credentials', type: 'warn', theme: 'light' })

        return
      }

      if (error.response?.data.message === 'activation link sent') {
        notify({
          msg: 'Account is not activated. Check mailbox.',
          type: 'info',
          theme: 'light',
        })

        return
      }

      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }, [isError])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    logIn({
      email: emailSignal.value,
      password: passwordSignal.value,
    })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
