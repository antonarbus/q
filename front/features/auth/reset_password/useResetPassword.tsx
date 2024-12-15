import { dispatch } from '@shared/lib/redux'
import type { Signal } from '@preact/signals-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useResetPasswordMutation, userSlice } from '@entities/user'
import { navItemKey } from '@shared/consts/navItemKey'
import { navSlice } from '@shared/nav'
import { notify } from '@shared/toast'
import type { AnimationScope } from 'motion-dom'
import { asyncDelay } from '@shared/utils/delay'

type Props = {
  passwordSignal: Signal<string>
  modalRef: React.RefObject<HTMLElement> | AnimationScope
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useResetPassword = ({ passwordSignal, slideOut }: Props): Res => {
  const navigate = useNavigate()
  const { email, resetPasswordKey } = useParams()

  const {
    mutate: resetPassword,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useResetPasswordMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'password was reset') {
        notify({ msg: 'Password was reset', theme: 'light' })

        if (!data.accessJwtToken) {
          return
        }

        if (!data.email) {
          return
        }

        dispatch(
          userSlice.actions.setAccessToken({
            accessToken: data.accessJwtToken,
          }),
        )

        dispatch(
          userSlice.actions.rememberLoggedUser({
            email: data.email,
            roles: data.roles ?? ['user'],
          }),
        )

        dispatch(
          navSlice.actions.hideNavItems({ navItemIdKeys: [navItemKey.login] }),
        )

        dispatch(
          navSlice.actions.showNavItems({
            navItemIdKeys: [navItemKey.profile],
          }),
        )

        const slideOutAndChangeUrl = async (): Promise<void> => {
          await asyncDelay(1000)
          await slideOut()
          void navigate('..')
        }

        void slideOutAndChangeUrl()
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'incorrect reset key') {
        notify({ msg: 'Incorrect reset key', type: 'warn', theme: 'light' })

        return
      }

      if (error.response?.data.message === 'validation error') {
        notify({ msg: 'Validation error', type: 'warn', theme: 'light' })

        return
      }

      if (error.response?.data.message === 'not activated') {
        notify({ msg: 'Account not activated', type: 'warn', theme: 'light' })

        return
      }

      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }, [isError])

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    resetPassword({
      password: passwordSignal.value,
      email: email ?? 'email is missing',
      resetPasswordKey: resetPasswordKey ?? 'resetPasswordKey is missing',
    })
  }

  return { onSubmit, isPending, isSuccess, isError }
}
