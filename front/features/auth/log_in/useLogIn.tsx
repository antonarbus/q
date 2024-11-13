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
import { slideElement } from '@shared/utils/slideElement'
import type { NavigateState } from '@shared/types/NavigateState'

type Props = {
  emailSignal: Signal<string>
  passwordSignal: Signal<string>
  modalRef: React.RefObject<HTMLDivElement>
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
  modalRef,
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

      setTimeout(() => {
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            const navigateTo = location.state?.navigateTo

            if (typeof navigateTo === 'string') {
              navigate(navigateTo)

              return
            }

            navigate('..')
          },
        })
      }, 1000)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      accessTokenSignal.value = null

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
