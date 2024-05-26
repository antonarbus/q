import { dispatch } from '@lib_instances/store'
import { type Signal } from '@preact/signals-react'
import { type UseMutationResult } from '@tanstack/react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarksQuery } from '@entities/bookmark'
import { useGetQuotationsQuery } from '@entities/quotation'
import { useLogInMutation, userSlice } from '@entities/user'
import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { navItemId } from '@shared/consts/navItemId'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice } from '@shared/nav'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'
import { notify } from '@shared/ui/top_msg'
import { slideElement } from '@shared/utils/slideElement'

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
  const { id } = useParams()
  const {
    mutate: logIn,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useLogInMutation()
  const location = useLocation()
  const { refetch: refetchQuotations } = useGetQuotationsQuery()
  const { refetch: refetchBookmarks } = useGetBookmarksQuery()

  useUpdateEffect(() => {
    if (isSuccess) {
      const { accessJwtToken, email, roles, message } = data

      if (data.name === 'MongooseError') {
        notify({ msg: 'Database error', type: 'warn', theme: 'light' })
        return
      }

      if (message !== 'good password') return
      if (!accessJwtToken) return
      if (!email) return
      if (!roles) return

      accessTokenSignal.value = accessJwtToken
      dispatch(userSlice.actions.rememberLoggedUser({ email, roles }))
      dispatch(
        navSlice.actions.hideNavItems({ navItemIdKeys: [navItemId.login] }),
      )
      dispatch(
        navSlice.actions.showNavItems({ navItemIdKeys: [navItemId.account] }),
      )

      if (location.pathname.includes(route.quotations)) {
        void refetchQuotations()
      }

      if (location.pathname.includes(route.bookmarks)) {
        void refetchBookmarks()
      }

      if (id) {
        reRenderQuotationSignal.value = nanoid(5)
      }

      setTimeout(() => {
        slideElement({
          element: modalRef.current,
          onSlideElementComplete: () => {
            const navigateTo = location.state?.navigateTo

            if (typeof navigateTo === 'string') {
              navigate(navigateTo, {
                replace: true,
                state: nanoid(),
              })
              return
            }

            navigate('..', {
              replace: true,
              state: nanoid(),
            })
          },
        })
      }, 1500)
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      accessTokenSignal.value = null

      if (error.response?.data.message === 'bad password') {
        notify({ msg: 'Invalid credentials', type: 'warn', theme: 'light' })
        return
      }

      if (error.response?.data.message === 'not activated') {
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
